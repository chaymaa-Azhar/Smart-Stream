import { fetchchannel } from "./api.js";
import { afficher } from "./ui.js";

const loader = document.querySelector("#loader");
const errorBox = document.querySelector("#error");
const errorMessage = document.querySelector("#error-msg");


const categoryToggle = document.querySelector("#category-toggle");
const categoryMenu = document.querySelector("#category-menu");
const categoryLabel = document.querySelector("#category-label");
let selectedCategory = "TOUS";

//filter input 
const searchInput = document.querySelector("#search-input");
let allchannels = [];
const search = () => {
  const text = searchInput.value.trim().toLowerCase();

  const filtered = allchannels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(text) ||
      String(channel.channelNumber).includes(text)
  );

  afficher(filtered);
};
//

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
    allchannels = await fetchchannel();
    afficher(allchannels);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader();
  }
}


searchInput.addEventListener("input", search);
document.querySelector("#retry").addEventListener("click", init);



const applyFilters = () => {
  const text = searchInput.value.trim().toLowerCase();

  const filtered = allchannels.filter((channel) => {
    const matchCategory =
      selectedCategory === "TOUS" || channel.category === selectedCategory;

    const matchText =
      channel.name.toLowerCase().includes(text) ||
      String(channel.channelNumber).includes(text);

    return matchCategory && matchText;
  });

  afficher(filtered);
};


categoryToggle.addEventListener("click", () => {
  categoryMenu.classList.toggle("hidden");
});

categoryMenu.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    categoryLabel.textContent = button.textContent;
    categoryMenu.classList.add("hidden");
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);


init();
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