(function() {
  const qParam = new URLSearchParams(location.search).get('q');

  // 1. GET QUERY FROM INPUT
  const searchInput = document.querySelector('input');
  const query = searchInput ? searchInput.value : 'tokyo';

  // 2. INJECT CSS
  const style = document.createElement('style');
  style.innerHTML = `
      /* 1️⃣ THE MAIN SCROLLABLE CONTAINER */
      #cse-results {
          width: 98vw !important;
          margin: 40px auto !important;
          height: 75vh !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          background: #eeeeee !important;
          border-radius: 5px !important;
          margin-top: 6vh !important;
          padding: 20px 0 !important;
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
})();
