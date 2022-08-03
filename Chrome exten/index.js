let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputbtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItem = "";
  for (let i = 0; i < leads.length; i++) {
    listItem +=
      // "<li> <a  href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
      `<li> <a target="_blank" href='${leads[i]}'>${leads[i]} </a></li>`;
    console.log(listItem);
  }
  ulEl.innerHTML = listItem;
}

deleteBtn.addEventListener("dblclick", function () {
  console.log("double clicked");
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputbtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  // console.log(localStorage.getItem("myLeads"));
});
