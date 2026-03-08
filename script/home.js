let allIssues = []
const getIssues = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    showLoading()
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
         allIssues = data.data
        displayAllIssues(allIssues)
        countIssues(allIssues)
        hideLoading()
    })
}

const showLoading = () =>{
    const loadingSpinner = document.getElementById('loadSpin')
    loadingSpinner.classList.remove('hidden')
    loadingSpinner.classList.add('flex')
}
const hideLoading = () =>{
    const loadingSpinner = document.getElementById('loadSpin')
    loadingSpinner.classList.add('hidden')
}

const countIssues = (amount) =>{
        const issueCount = document.getElementById('issueCount')
        issueCount.innerText = amount.length
}

const displayAllIssues = (cards) => {
    const issueSection = document.getElementById('issueSection')
    issueSection.innerHTML = ""

   cards.forEach((card)=>{
     const issue = document.createElement('div')
     issue.className = "card bg-base-200 p-4 shadow-lg"
     issue.innerHTML = `
         <div onclick="loadIssueDetail(${card.id})" >  
            <div class="flex justify-between items-center my-2">
                <div><img src="${card.status == "open"? "assets/Open-Status.png":"assets/Closed-Stat.png" }" alt=""></div>
                <h2 class="bg-gray-200 px-2 rounded-lg ">${card.priority}</h2>  
            </div>
            <div class="my-3 space-y-3">
                <h1 class="font-bold">${card.title}</h1>
                <p>${card.description}</p>
            </div>
            <div class="flex space-x-2 my-3">
                ${card.labels.map(label => `<h1 class="bg-yellow-200 p-1 rounded-lg">${label}</h1>`).join("")}
            </div>
            <hr>
            <div class="md:flex justify-between items-center my-5">
                <div class="space-y-2">
                    <p>${card.author}</p>
                    <p>Assignee : ${card.assignee}</p>
                </div>
                <div class="space-y-2" >
                    <p>${card.createdAt}</p>
                    <p>Update : ${card.updatedAt}</p>
                </div>
            </div>
         </div>
     ` 
        // open or close status 
        if(card.status == "open"){
            issue.classList.add('border-t-6','border-green-600')
        }
       else if(card.status == "closed"){
            issue.classList.add('border-t-6','border-violet-600')
        }
    issueSection.appendChild(issue)
   })
        
}

const filterIssues  = (status) =>{
    
    if(status == "all"){
        displayAllIssues(allIssues)
        countIssues(allIssues)
      }
    else if(status == "open"){
        const opened = allIssues.filter(issue => issue.status == "open")
        displayAllIssues(opened)
        countIssues(opened)
        }
    else if(status == "closed"){
        const closed = allIssues.filter(issue => issue.status == "closed")
        displayAllIssues(closed)
        countIssues(closed)
      }
}

const loadIssueDetail = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const details = data.data
        displayIssueDetails(details)
    })
}
const displayIssueDetails = (issue) =>{
    const detailBox = document.getElementById('details-container')
    detailBox.innerHTML = `
        <h1 class="text-xl font-bold mb-2">${issue.title}</h1>
    <div class="flex space-x-5">
        <p class="bg-gray-200 px-2 rounded-lg">${issue.status}</p>
        <hr>
        <p>${issue.author}</p>
        <hr>
        <p>${issue.updatedAt}</p>
    </div>
     <div class="flex space-x-2 my-3">
                ${issue.labels.map(label => `<h1 class="bg-yellow-200 p-1 rounded-lg">${label}</h1>`).join("")}
    </div>
    <p class="mb-2">${issue.description}</p>
    <div class="flex justify-between p-4 bg-gray-200">
        <div>
            <p>Assignee :</p>
            <h1>${issue.assignee}</h1>
        </div>
        <div>
            <p>Priority :</p>
             <p class="bg-white px-2 rounded-lg">${issue.priority}</p>
        </div>
    </div>
    `
    document.getElementById('issue_modal').showModal()
}  

getIssues()

document.getElementById('btnSearch')
.addEventListener('click', ()=>{
    const input = document.getElementById('inputSearch')
    const searchValue = input.value.trim().toLowerCase()
    const searchFilterIssues = allIssues.filter(issue =>issue.title.toLowerCase().includes(searchValue))
    displayAllIssues(searchFilterIssues)
    countIssues(searchFilterIssues)
})