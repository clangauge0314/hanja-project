export function createWordCard(word) {
  return `
      <div 
        class="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 border border-gray-200 cursor-pointer" 
  
        onclick="window.showLearnHanjaModal(${JSON.stringify(word).replace(
          /"/g,
          "&quot;"
        )})"
      >
        <h1 class="!text-8xl md:text-9xl font-extrabold text-center mb-4 text-black">
          ${word.hanja}
        </h1>
        <div class="space-y-3">
          <p class="flex items-center text-gray-700 text-xl">
            <i class="fas fa-book-open text-green-500 mr-2"></i> 
            <span class="font-semibold">${word.meaning}</span> 
          </p>
          <p class="flex items-center text-gray-700 text-xl">
            <i class="fas fa-pencil-alt text-blue-500 mr-2"></i> 
            <span class="font-semibold">${word.stroke} 획</span> 
          </p>
          <p class="flex items-start text-gray-700 text-xl">
            <i class="fas fa-comment-dots text-purple-500 mr-2 mt-1"></i> 
            <span class="font-semibold">${word.description.slice(0, 10)}</span> 
          </p>
          <p class="text-gray-500 text-sm flex items-center">
            <i class="fas fa-calendar-alt mr-2"></i> 
            ${new Date(word.createdAt).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </div>
      </div>
    `;
}

export function initializeWordList({searchInput, filterType, loadMoreBtn, onSearch, onFilterChange, onLoadMore}) {
    if(searchInput) {
        searchInput.addEventListener("input", onSearch);
    }

    if(filterType) {
        filterType.addEventListener("change", onFilterChange);
    }

    if(loadMoreBtn) {
        loadMoreBtn.addEventListener("click", onLoadMore);
    }
}

export function filterWords(allWords, searchInput, filterType) {
    const searchValue = searchInput.value.toLowerCase();
    const filterValue = filterType.value;

    return allWords.filter((word) => {
        const valueToSearch = word[filterValue].toString().toLowerCase() || "";
        return valueToSearch.includes(searchValue);
    })
}

export async function loadModals(modalPaths) {
  const responses = await Promise.all(modalPaths.map((path) => fetch(path)));
  const htmlContents = await Promise.all(
    responses.map((response) => response.text())
  );
  document.getElementById("modal-container").innerHTML = htmlContents.join("");
}
