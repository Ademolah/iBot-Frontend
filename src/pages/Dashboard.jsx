import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';
import { apiClient } from '../api/base';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode, Plus, User, Phone, LogOut, Package, 
  CheckCircle2, XCircle, AlertCircle, RefreshCw 
} from 'lucide-react';

export default function Dashboard() {
  const { tenant, logout } = useAuth();
  const { setCurrentScreen } = useNavigation();
    // --- Dynamic UI Notification States ---
  const [showToast, setShowToast] = useState(false);


  // --- Core Application States ---
  const [inventory, setInventory] = useState([]);
  const [botStatus, setBotStatus] = useState('DISCONNECTED');
  const [qrCodeString, setQrCodeString] = useState(null);
  const [error, setError] = useState(null);
  const [isSpawning, setIsSubmittingSpawn] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  // --- Form Input States ---
  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState('');
  const [prodModel, setProdModel] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodSpecs, setProdSpecs] = useState('');
  const [prodAliases, setProdAliases] = useState('');

  const [newAlertNumber, setNewAlertNumber] = useState(tenant?.alertPhoneNumber || '');
  const [isUpdatingNumber, setIsUpdatingNumber] = useState(false);
  const [numberSuccess, setNumberSuccess] = useState(false);

  const pollingRef = useRef(null);

  // Format the user's phone number as a friendly header title
  const formattedUser = tenant?.alertPhoneNumber ? `+${tenant.alertPhoneNumber}` : 'Connected Account';

  // 1. Fetch User Inventory Data
  const loadInventory = async () => {
    try {
      // Re-uses your standard multi-tenant secure endpoint wrapper
      const result = await apiClient('/tenant/inventory', { method: 'GET' });
      if (result.status === 'success') {
        setInventory(result.data || []);
      }
    } catch (err) {
      // Quiet fail to keep the dashboard look clean
      setInventory([]);
    }
  };

    // 2. Poll the Backend for Live QR and Login Connection States
  const checkBotStatus = async () => {
    try {
      const result = await apiClient('/tenant/bot/status', { method: 'GET' });
      if (result && result.status === 'success') {
        const currentStatus = result.data.connectionStatus;
        
        setBotStatus(currentStatus);

        // If the user successfully links their phone, stop the background network loop
        // and instantly clear the QR string out of memory to hide the canvas widget box!
        if (currentStatus === 'CONNECTED') {
          setQrCodeString(null);
          stopPolling();
        } else {
          setQrCodeString(result.data.qrCode);
        }
      }
    } catch (err) {
      setError('Could not connect to the bot server checker loop.');
    }
  };


  const startPolling = () => {
    stopPolling();
    checkBotStatus();
    pollingRef.current = setInterval(checkBotStatus, 3000); // Check safely every 3 seconds
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  useEffect(() => {
    loadInventory();
    checkBotStatus();
    return () => stopPolling();
  }, []);

     // 3. Request WhatsApp Connection (Spawn Instance)
    // 3. Request WhatsApp Connection (Spawn Instance)
  const handleStartConnection = async () => {
    // 🔍 FRONTEND DEBUG TRACE 1: Entry Point Triggered
    console.log('🚀 [BOT SPAWN TRIGGER]: Initiating connection handshake routine from frontend dashboard UI...');
    
    setError(null);
    setIsSubmittingSpawn(true);
    
    // 🌟 THE CRITICAL FRONTEND OVERRIDE: Clear old state parameters immediately on click!
    // This breaks the "CONNECTED" visual lock, forces the box to mount the QR container,
    // and clears any stale matrix data before the new network poll completes.
    setBotStatus('GENERATING_QR');
    setQrCodeString(null);

    try {
      // Execute the secure network transaction call to Render
      const result = await apiClient('/tenant/bot/spawn', { method: 'POST' });
      
      // 🔍 FRONTEND DEBUG TRACE 2: Parse Network Transaction Payload
      console.log('📡 [BOT SPAWN RESPONSE]: API layer execution complete. Server payload payload:', result);

      if (result && result.status === 'success') {
        console.log('✨ [BOT SPAWN SUCCESS]: Channel allocation script accepted. Initializing 3s polling loop routine...');
        
        // Flash the minimalist SaaS toast banner layout elegantly
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
        // Start checking your backend routes every 3 seconds for the fresh string
        startPolling(); 
      } else {
        console.warn('⚠️ [BOT SPAWN MISMATCH]: Endpoint returned 200/202 but did not explicitly sign off status as "success".');
      }
    } catch (err) {
      // 🔍 CRITICAL PRODUCTION ERROR CAPTURE: Prints the exact failure reason in your browser console logs
      console.error('❌ [BOT SPAWN CRASH]: Critical infrastructure transaction fault caught:', {
        errorMessage: err.message,
        errorStack: err.stack,
        contextBaseUrl: import.meta.env.VITE_API_URL || 'Fallback Localhost'
      });

      setError(err.message || 'Failed to start the WhatsApp connector.');
      // Fallback state guard if the network connection breaks
      setBotStatus('DISCONNECTED');
    } finally {
      setIsSubmittingSpawn(false);
      console.log('🏁 [BOT SPAWN CYCLE COMPLETE]: Submitting thread controls released.');
    }
  };




    // Request Alert Number Update
    const handleUpdateAlertNumber = async (e) => {
        e.preventDefault();
        setError(null);
        setIsUpdatingNumber(true);
        setNumberSuccess(false);

        try {
        const result = await apiClient('/tenant/alert-number', {
            method: 'PATCH',
            body: JSON.stringify({ alertPhoneNumber: newAlertNumber })
        });

        if (result.status === 'success') {
            setNumberSuccess(true);
            // Cleanly wipe the success banner after 3 seconds
            setTimeout(() => setNumberSuccess(false), 3000);
        }
        } catch (err) {
        setError(err.message || 'Could not update your notification phone number.');
        } finally {
        setIsUpdatingNumber(false);
        }
    };


  // 4. Add Product to Database
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(null);

    if (!prodName || !prodPrice || !prodBrand || !prodModel) {
      setError('Please fill in all the primary item labels.');
      return;
    }

    try {
      const payload = {
        name: prodName,
        brand: prodBrand,
        modelName: prodModel,
        specs: prodSpecs.split(',').map(s => s.trim()).filter(Boolean),
        aliases: prodAliases.split(',').map(a => a.toLowerCase().trim()).filter(Boolean),
        price: Number(prodPrice)
      };

      await apiClient('/tenant/inventory', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      // Reset Form fields cleanly
      setProdName(''); setProdBrand(''); setProdModel('');
      setProdPrice(''); setProdSpecs(''); setProdAliases('');
      setIsAddingItem(false);
      
      // Reload inventory view
      loadInventory();
    } catch (err) {
      setError(err.message || 'Could not save item to inventory.');
    }
  };

    // Request Item Deletion
  const handleDeleteProduct = async (productId) => {
    // A clean browser confirmation box to prevent accidental clicks
    if (!window.confirm('Are you sure you want to remove this item from your stock?')) return;

    try {
      const result = await apiClient(`/tenant/inventory/${productId}`, {
        method: 'DELETE'
      });

      if (result.status === 'success') {
        // Refresh the table layout view instantly
        loadInventory();
      }
    } catch (err) {
      setError(err.message || 'Could not delete the item.');
    }
  };


  const handleExit = () => {
    stopPolling();
    logout();
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-dark flex flex-col font-sans">
      
      {/* 💻 INTERNAL TOP HEADER CONTROL BAR */}
      <header className="w-full bg-white border-b-2 border-brand-dark px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-dark text-white text-xs font-mono font-bold rounded-sm uppercase tracking-wider">
            <User className="w-3 h-3 text-brand-volt" />
            <span>{formattedUser}</span>
          </div>
        </div>
        <button 
          onClick={handleExit}
          className="text-xs font-bold tracking-tight text-red-600 border-2 border-red-600/20 px-3 py-1.5 rounded-sm hover:bg-red-50 transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit System</span>
        </button>
      </header>

      {/* 📊 CORE COMMAND CONTROL GRID MAPPING */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* LEFT COLUMN PANEL: WHATSAPP PHONE SENDER CONNECTOR CHANNEL */}
        <section className="lg:col-span-4 flex flex-col gap-6">

  {/* 🌟 NEW NOTIFICATION SETTINGS CARD */}
  <div className="p-6 bg-white border-2 border-brand-dark rounded-premium shadow-sm flex flex-col gap-4">
    <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-gray-400">
      Notification Routing Settings
    </h3>
    
    <form onSubmit={handleUpdateAlertNumber} className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-bold text-brand-dark mb-1.5">
          Receive Sales Alerts On:
        </label>
        <div className="flex gap-2">
          <input 
            type="text" 
            required 
            value={newAlertNumber} 
            onChange={(e) => setNewAlertNumber(e.target.value)} 
            className="flex-grow p-3 bg-white border border-gray-300 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand-dark" 
            placeholder="e.g. 2348039098270" 
          />
          <button 
            type="submit" 
            disabled={isUpdatingNumber}
            className="px-4 py-3 bg-brand-dark text-white text-xs font-bold rounded-premium hover:bg-black transition-colors disabled:opacity-50 shrink-0"
          >
            {isUpdatingNumber ? 'SAVING...' : 'SAVE'}
          </button>
        </div>
      </div>
    </form>

    {numberSuccess && (
      <div className="p-2.5 bg-green-50 border border-brand-mint text-green-800 rounded-sm text-[11px] font-bold tracking-tight animate-fadeIn">
        ✓ Notification path redirected completely.
      </div>
    )}
  </div>

       {/* ORIGINAL LINK SYSTEM CARD */}
  <div className="p-6 bg-white border-2 border-brand-dark rounded-premium shadow-sm flex flex-col gap-6 relative">
    
    {/* ELEGANT TOAST BANNER DISPLAY FLOATER */}
    {showToast && (
      <div className="fixed bottom-6 right-6 z-50 bg-brand-dark text-white border border-brand-mint px-4 py-3 text-xs font-mono font-bold tracking-tight rounded-sm shadow-hard animate-fadeIn flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
        <span>NEW QR CODE GENERATED SUCCESSFULLY</span>
      </div>
    )}

    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
      <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
        <QrCode className="w-5 h-5 text-brand-mint" />
        <span>Link System</span>
      </h2>
      
      {/* Dynamic Status Badges */}
      {botStatus === 'CONNECTED' && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-50 border border-brand-mint text-[10px] font-bold uppercase tracking-wider text-green-700 rounded-sm">
          <CheckCircle2 className="w-3 h-3 text-brand-mint fill-brand-mint" /> Connected
        </span>
      )}
      {(botStatus === 'GENERATING_QR' || botStatus === 'INITIALIZING') && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-yellow-50 border border-yellow-400 text-[10px] font-bold uppercase tracking-wider text-yellow-700 rounded-sm animate-pulse">
          <RefreshCw className="w-3 h-3 text-yellow-600 animate-spin" /> Ready to Scan
        </span>
      )}
      {botStatus === 'DISCONNECTED' && (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-50 border border-brand-dark/20 text-[10px] font-bold uppercase tracking-wider text-gray-500 rounded-sm">
          Offline
        </span>
      )}
    </div>

    {error && (
      <div className="p-3.5 bg-red-50 border border-red-200 text-red-900 rounded-premium text-xs font-bold leading-normal flex gap-2">
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
        <span>{error}</span>
      </div>
    )}

    {/* THE VISUAL HANDSHAKE CANVAS DISPLAY ROUTINE */}
    <div className="w-full aspect-square bg-brand-canvas border-2 border-dashed border-gray-300 rounded-premium flex flex-col items-center justify-center p-6 relative group overflow-hidden">
      
      {/* DISPLAY STATE A: BOT CONNECTED AND ACTIVE */}
      {botStatus === 'CONNECTED' && (
        <div className="flex flex-col items-center text-center gap-3 animate-fadeIn">
          <div className="w-16 h-16 bg-green-50 border border-brand-mint flex items-center justify-center rounded-full">
            <CheckCircle2 className="w-8 h-8 text-brand-mint fill-brand-mint" />
          </div>
          <h4 className="font-display font-bold text-lg">System Active</h4>
          <p className="text-gray-400 text-xs font-medium max-w-[200px] leading-relaxed">
            iBot is listening to group chat feeds and routing alerts to your private manager number.
          </p>
        </div>
      )}

      {/* DISPLAY STATE B: RECEIVING QR MATRIX STREAM FROM BACKEND */}
      {(botStatus === 'GENERATING_QR' || botStatus === 'INITIALIZING') && qrCodeString ? (
        <div className="flex flex-col items-center gap-4 animate-fadeIn">
          <div className="p-4 bg-white border-2 border-brand-dark rounded-sm shadow-sm">
            <QRCodeSVG value={qrCodeString} size={180} level="H" includeMargin={false} />
          </div>
          <p className="text-gray-400 text-[11px] font-bold tracking-tight text-center leading-normal max-w-[220px]">
            Open WhatsApp ➔ Settings ➔ Linked Devices ➔ Tap Link a Device, and scan this code image.
          </p>
        </div>
      ) : null}

      {/* DISPLAY STATE C: SPINNER LOADER WATCHING FOR COLD INITIATIONS */}
      {(botStatus === 'GENERATING_QR' || botStatus === 'INITIALIZING') && !qrCodeString ? (
        <div className="flex flex-col items-center text-center gap-3 animate-fadeIn">
          <RefreshCw className="w-8 h-8 text-brand-dark animate-spin" />
          <h4 className="font-display font-bold text-sm text-brand-dark">Fetching Session Code...</h4>
          <p className="text-gray-400 text-xs font-medium max-w-[180px] leading-normal text-center">
            Communicating with background container nodes to draw your connection keys.
          </p>
        </div>
      ) : null}

      {/* DISPLAY STATE D: OFFLINE AND SHUTDOWN STATE OVERLAYS */}
      {botStatus === 'DISCONNECTED' && (
        <div className="flex flex-col items-center text-center gap-3 animate-fadeIn">
          <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-gray-400" />
          </div>
          <h4 className="font-display font-bold text-sm text-gray-600">WhatsApp Link Closed</h4>
          <p className="text-gray-400 text-xs font-medium max-w-[200px] leading-relaxed">
            Click the action below to spin up a connection stream code.
          </p>
        </div>
      )}
    </div>

    {/* PERPETUAL GENERATION CONTROL INTERCEPT BUTTON */}
    <button
      onClick={handleStartConnection}
      disabled={isSpawning}
      className="w-full py-4 bg-brand-dark text-white font-bold text-xs rounded-premium hover:bg-black active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center cursor-pointer"
    >
      {isSpawning ? 'CREATING SESSION ENVIRONMENT...' : 'GENERATE CONNECTION CODE'}
    </button>
  </div>



</section>


        {/* RIGHT COLUMN PANEL: INVENTORY MANAGEMENT AND CATALOG GRID */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Package className="w-6 h-6 text-brand-dark" />
              <span>Product Records</span>
            </h2>
            <button
              onClick={() => setIsAddingItem(!isAddingItem)}
              className="px-4 py-2 bg-brand-dark text-white font-bold text-xs rounded-premium hover:bg-black flex items-center gap-1.5 active:scale-95 transition-transform w-full sm:w-auto justify-center"
            >
              {isAddingItem ? 'Close Registry' : (
                <>
                  <span>Add Stock Item</span>
                  <Plus className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* CREATE INVENTORY PRODUCT DROPDOWN FORM MODULE */}
          {isAddingItem && (
            <form onSubmit={handleAddProduct} className="p-6 bg-white border-2 border-brand-dark rounded-premium shadow-sm flex flex-col gap-5 animate-fadeIn">
              <h3 className="text-sm font-bold tracking-tight border-b border-gray-100 pb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-brand-mint" />
                New Stock Entry Formula
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Product Title Name</label>
                  <input type="text" required value={prodName} onChange={(e) => setProdName(e.target.value)} className="w-full p-3 bg-brand-canvas border border-gray-300 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand-dark focus:bg-white transition-colors" placeholder="e.g. Apple MacBook Pro M2" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Brand Label</label>
                  <input type="text" required value={prodBrand} onChange={(e) => setProdBrand(e.target.value)} className="w-full p-3 bg-brand-canvas border border-gray-300 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand-dark focus:bg-white transition-colors" placeholder="e.g. Apple" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Model Blueprint Class</label>
                  <input type="text" required value={prodModel} onChange={(e) => setProdModel(e.target.value)} className="w-full p-3 bg-brand-canvas border border-gray-300 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand-dark focus:bg-white transition-colors" placeholder="e.g. MacBook Pro" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Listed Price (₦)</label>
                  <input type="number" required value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} className="w-full p-3 bg-brand-canvas border border-gray-300 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand-dark focus:bg-white transition-colors" placeholder="e.g. 1850000" />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Fuzzy Lookup Aliases</label>
                  <input type="text" value={prodAliases} onChange={(e) => setProdAliases(e.target.value)} className="w-full p-3 bg-brand-canvas border border-gray-300 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand-dark focus:bg-white transition-colors" placeholder="Separate with commas (e.g. mac m2, macbook m2, m2 pro)" />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Specifications Tags</label>
                  <input type="text" value={prodSpecs} onChange={(e) => setProdSpecs(e.target.value)} className="w-full p-3 bg-brand-canvas border border-gray-300 rounded-sm text-xs font-semibold focus:outline-none focus:border-brand-dark focus:bg-white transition-colors" placeholder="Separate with commas (e.g. 16GB RAM, 512GB SSD)" />
                </div>
              </div>

              <button type="submit" className="w-full mt-2 py-3.5 bg-brand-dark text-white font-bold text-xs rounded-premium uppercase tracking-wider hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-mint" />
                COMMIT STOCK LISTING RECORD
              </button>
            </form>
          )}

          {/* DYNAMIC TABULAR INVENTORY PRESENTATION VIEWS */}
          <div className="bg-white border-2 border-brand-dark rounded-premium shadow-sm overflow-hidden">
            {inventory.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center gap-3">
                <div className="w-16 h-16 bg-brand-canvas rounded-full flex items-center justify-center mb-2">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">Catalog is completely clear.</h3>
                <p className="text-xs text-gray-500 font-medium">Click Add Stock Item above to feed entries into Mongoose.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
  <thead>
    <tr className="bg-brand-canvas border-b border-gray-200">
      <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Item Identifier Name</th>
      <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Model Blueprint</th>
      <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Price Valuation</th>
      <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</th>
      <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-gray-500 text-center">Actions</th> {/* 🌟 Added Actions Header */}
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-100">
    {inventory.map((item, index) => (
      <tr key={item._id || index} className="hover:bg-brand-canvas/50 transition-colors">
        <td className="p-4 font-bold text-sm text-brand-dark">
          {item.name}
        </td>
        <td className="p-4">
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-sm">
            {item.brand} ➔ {item.modelName}
          </span>
        </td>
        <td className="p-4 font-mono font-bold text-sm">
          ₦{item.price?.toLocaleString()}
        </td>
        <td className="p-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 text-[10px] font-bold uppercase tracking-wider text-green-700 rounded-sm">
            Active
          </span>
        </td>
        
        {/* 🌟 THE SURGICAL ACTIONS CELL WITH DELETION TRASH CAN */}
        <td className="p-4 text-center">
          <button
            onClick={() => handleDeleteProduct(item._id)}
            className="p-1.5 border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-600 rounded-sm active:scale-90 transition-all cursor-pointer"
            title="Delete Item"
          >
            <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </td>

      </tr>
    ))}
  </tbody>
</table>

              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}