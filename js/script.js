// Global variables
const studentItems  = document.querySelectorAll('.student-item');
const itemsPerPage  = 10;

// Display 10 students based on selected page and their index position
function showPage(list, page) {
    const startIndex = (page * itemsPerPage) - itemsPerPage; // From student x
    const endIndex = (page * itemsPerPage); // To student y
    // Hide students outside of the selection
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = '';
        } else {
            list[i].style.display = 'none';
        }
    }
};
// Create search form
function searchForm(searchList) {
    // Create new elements
    const pageHeader    = document.querySelector('div .page-header');
    const searchDiv     = document.createElement('div');
    const searchInput   = document.createElement('input');
    const searchButton  = document.createElement('button');
    // Add element properties
    searchDiv.className       = 'student-search';
    searchInput.placeholder   = 'Search for students...';
    searchButton.textContent  = 'Search';
    // Combine elements to search form
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
    pageHeader.appendChild(searchDiv);
    // Search based on input and button click
    searchButton.addEventListener('click', (event)=> {
        event.preventDefault();
        searchNow(searchInput.value.toLowerCase(), searchList);
    })
    // Search based on keyboard entry
    searchInput.addEventListener('keyup', ()=> {
        searchNow(searchInput.value.toLowerCase(), searchList);
    })
};

// Search Functionality
function searchNow(searchFor, searchIn) {
    //Convert studentItems nodes to array (Source: https://davidwalsh.name/nodelist-array)
    const nodeToArray = [].slice.call(searchIn);
    // Create array to hold students that meet search criteria
    const filteredList = [];
    // Reset pagination
    const removeDiv = document.querySelector('div.pagination');
    removeDiv.remove();
    // Reset students found option
    const noStudentsFound = document.querySelector('.page-header h2');
    noStudentsFound.textContent = 'Students';

    // Search student records
    for (let i = 0; i < searchIn.length; i++) {
        // Reset student display value
        searchIn[i].style.display = '';
        // Add positive matches to new list
        if (searchIn[i].children[0].children[1].textContent.toLowerCase().includes(searchFor)) {
            filteredList.push(nodeToArray[i]);
        // Hide records that don't match search input
        } else {
            searchIn[i].style.display = 'none';
        }
    }
    // Add no results text
    if (filteredList.length <= 0) {
      noStudentsFound.textContent = 'Sorry, no students found';
    }
    // Call students per page function based on new list and set gape to page 1
    showPage(filteredList, 1);
    // Call pagination function based on new list
    appendPageLinks(filteredList);
};

// Generate and append pagenumers plus functionality 
function appendPageLinks(list) {
    // Calculate the number of pages based on the list lenght & total students
    const pages = Math.ceil(list.length / itemsPerPage);
    // set .page div to variable
    const pageDiv = document.querySelector('div.page');
    // Create new elements
    const paginationDiv = document.createElement('div');
    const ul = document.createElement('ul');
    // Add new components to .pagination div and append it to the .page div
    paginationDiv.setAttribute('class', 'pagination');
    paginationDiv.appendChild(ul);
    pageDiv.appendChild(paginationDiv);
    // Add page links in li elements based on the list lenght
    for (let i = 0; i < pages; i++) {
        const li = document.createElement('li');
        const number = i + 1;
        li.innerHTML = '<a href="#">' + number + '</a>';
        ul.appendChild(li);
    }
    // Set to page 1 to active
    ul.children[0].firstChild.className = 'active';
    // Add click function to the pagenumbers
    ul.addEventListener('click', (event) => {
      if (event.target.tagName == 'A') {
        const selectedPage = parseInt(event.target.textContent);
        showPage(list, selectedPage);
        for (let i = 0; i < ul.children.length; i++) {
          // Reset active page
          ul.children[i].firstChild.className = '';
          // Set active page
          if (ul.children[selectedPage - 1]) {
              ul.children[selectedPage - 1].firstChild.className = 'active';
          }
        }
      }
    })
};

showPage(studentItems, 1);
appendPageLinks(studentItems);
searchForm(studentItems); // Outcomment to remove search option
