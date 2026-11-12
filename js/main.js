import { fetchchannel } from "./api.js";
import { afficher } from "./ui.js";

const loader = document.querySelector("#loader");
const errorBox = document.querySelector("#error");
const errorMessage = document.querySelector("#error-msg");
//filter input
const searchInput = document.querySelector('#search-input');
let allchannels=[]
const search=()=>{
    const text = searchInput.value.trim().toLowerCase();
    const filtered= allchannels.filter(
        (channel)=>
     channel.name.toLowerCase().includes(text) ||
     String(channel.channelNumber).includes(text)
  );

  afficher(filtered);
};


const showLoader = () => loader.classList.remove("hidden");
const hideLoader = () => loader.classList.add("hidden");

const showError = (message) => {
  errorMessage.textContent = message;
  errorBox.classList.remove("hidden");
};
const hideError = () => errorBox.classList.add("hidden");

const init = async () => {
  hideError();
  showLoader();

  try {
    allchannels= await fetchchannel()
    afficher(allchannels);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader();
  }
}


searchInput.addEventListener("input", search);
document.querySelector("#retry").addEventListener("click", init);
init();