import { fetchchannel } from "./api.js";
import { afficher } from "./ui.js";

const loader = document.querySelector("#loader");
const errorBox = document.querySelector("#error");
const errorMessage = document.querySelector("#error-msg");

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
    const channels = await fetchchannel();
    afficher(channels);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader();
  }
}

const channels = await fetchchannel();
console.log(channels);   
afficher(channels);

document.querySelector("#retry").addEventListener("click", init);
init();