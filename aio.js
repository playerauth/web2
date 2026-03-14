(function() {
const loader = document.createElement('div');
loader.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:white;display:flex;align-items:center;justify-content:center;z-index:9999;font-size:3vh;font-weight:1000;";
loader.innerHTML = "Loading... If it take too much time please go back to results page reload it and re click the tab you want to see...";
document.body.appendChild(loader);
  
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || 'india';

  const searchInput = document.querySelector('input');
  if (searchInput) searchInput.value = query; 
  // 2. INJECT CSS
  const style = document.createElement('style');
  style.innerHTML = `
      /* 1️⃣ THE MAIN SCROLLABLE CONTAINER */
      #cse-results {
    width: 98vw !important;
    height: 75vh !important;
    position: fixed !important;
    top: 3vh !important;     /* Keeps it near the top */
    left: 1vw !important;    /* Correct way to center with fixed position */
    margin: 0 !important;    /* REMOVE the old margins */
    
    overflow-y: auto !important;
    overflow-x: hidden !important;
    background: #eeeeee !important;
    border-radius: 5px !important;
    padding: 20px 0 !important;
    z-index: 1000 !important; /* Add this to ensure it stays on top */
    -webkit-overflow-scrolling: touch;
}


      /* 2️⃣ THE CARDS (80vw inside 90vw container) */
      .gsc-webResult .gsc-result {
          width: 88vw !important;
          font-weight: 900 !important;
          margin: 0 auto 20px auto !important;
          border-radius: 8px !important;
          background: #ffffff !important;
          padding: 15px !important;
          border: 1px solid #3abe10 !important;
          box-sizing: border-box !important;
          margin-left: 5vw !important;
          display: block !important;
      }
.gsc-thumbnail {
          width: auto !important;
          height: auto !important;
          border-radius: 1vh !important;
          padding-right: 15px !important;
      }

      .gsc-thumbnail img {
          border-radius: 4px !important;
          width: 100% !important;
          height: 100% !important;
      }
      /* 3️⃣ CONTENT VISIBILITY */
      .gs-title, .gs-snippet, .gsc-thumbnail, .gsc-url-top, .gsc-url-bottom {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
      }

      /* 4️⃣ THE "NO BR" & "NO DOUBLE TITLE" FIX */
      /* Kill all line breaks inside titles and descriptions */
      .gs-title br, .gs-title * br, .gs-snippet br, .gs-snippet * br { 
          display: none !important; 
      }

      /* Force title parts to stay together as one sentence */
      .gs-title, .gs-title a, .gs-title b {
          display: inline !important;
          white-space: normal !important;
      }

      /* Hide ONLY the extra duplicate title generated in the snippet box */
      .gsc-table-cell-snippet-close .gs-title { 
          display: none !important; 
      }

      /* 5️⃣ PAGINATION */
      .gsc-cursor-box {
          display: block !important;
          text-align: center !important;
          margin: 20px 0 !important;
      }

      /* 6️⃣ CLEANUP GOOGLE UI */
      .gsc-adBlock { display: none !important; }
      .gsc-control-cse { padding: 0 !important; border: none !important; background: transparent !important; }
  `;
  document.head.appendChild(style);

  // 3. GOOGLE CSE LOGIC (Explicit Render)
  window.__gcse = {
    parsetags: 'explicit',
    initializationCallback: function() {
      const renderSearch = () => {
        const containerId = 'cse-results';
        let cseDiv = document.getElementById(containerId);
        
        if (!cseDiv) {
          cseDiv = document.createElement('div');
          cseDiv.id = containerId;
          const nav = document.querySelector('.up');
          nav ? nav.parentNode.insertBefore(cseDiv, nav.nextSibling) : document.body.appendChild(cseDiv);
        }

        google.search.cse.element.render({ 
          div: containerId, 
          tag: 'searchresults-only', 
          gname: 'aio-search' 
        });

        google.search.cse.element.getElement('aio-search').execute(query);
        setTimeout(()=>loader.remove(),800);
      };

      if (document.readyState === 'complete') renderSearch();
      else google.setOnLoadCallback(renderSearch, true);
    }
  };
 
  setTimeout(function() {
    window.scrollTo({
        top: 180,
        behavior: 'auto'
    });
}, 100);
  // Simple function to add powered by Google text
function addPoweredByGoogle() {
  // Small delay to ensure Google results are loaded
  setTimeout(function() {
    const googleResults = document.getElementById('cse-results');
    if (!googleResults) return;
    
    // Check if Google results actually exist
    if (!googleResults.querySelector('.gsc-control-cse')) return;
    
    // Remove any existing powered by text
    const existingPoweredBy = document.getElementById('powered-by-google');
    if (existingPoweredBy) existingPoweredBy.remove();
    
    // Create powered by text
    const poweredBy = document.createElement('div');
    poweredBy.id = 'powered-by-google';
    poweredBy.style.cssText = `
      text-align: center;
      padding: 20px;
      margin: 10px auto 40px auto;
      font-family: Arial, sans-serif;
      font-size: 14px;
      color: #ccc;
      width: 80vw;
      max-width: 800px;
    `;
    poweredBy.innerHTML = 'Powered by <span style="color: #4285f4; font-weight: 500;"><a href="https://www.google.com" style="text-decoration: none;">Google</a></span> Search';
    
    // Append AFTER all Google content
    googleResults.appendChild(poweredBy);
  }, 2000); // Wait 2 seconds for Google to fully load
}

// Only run once when page loads and when tabs are clicked
window.addEventListener('load', function() {
  setTimeout(addPoweredByGoogle, 2500);
});

// Also run when ALL or WEB tab is clicked
document.addEventListener('click', function(e) {
  if (e.target.id === 'all' || e.target.closest('#all') || 
      e.target.id === 'web' || e.target.closest('#web')) {
    setTimeout(addPoweredByGoogle, 2500);
  }
}, true);
})();
