const getIssues = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    fetch(url)
    .then((res) => res.json())
    .then((data) => {displayAllIssues(data.data)
                     countIssues(data.data)
    })
}

const countIssues = (cards) =>{
        const issueCount = document.getElementById('issueCount')
        issueCount.innerText = cards.length
}

const displayAllIssues = (cards) => {
    const issueSection = document.getElementById('issueSection')
    issueSection.innerHTML = ""

   cards.forEach((card)=>{
     const issue = document.createElement('div')
     issue.className = "card bg-base-200 p-4 shadow-lg"
     issue.innerHTML = `
         
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
                <div>
                    <p>${card.author}</p>
                    <p>Assignee : ${card.assignee}</p>
                </div>
                <div>
                    <p>${card.createdAt}</p>
                    <p>Update : ${card.updatedAt}</p>
                </div>
            </div>
     ` 
        // open or close status 
        if(card.status == "open"){
            issue.classList.add('border-t-6','border-green-600')
        }
       else if(card.status == "closed"){
            issue.classList.add('border-t-6','border-purple-600')
        }
    issueSection.appendChild(issue)
   })
        
}

getIssues()