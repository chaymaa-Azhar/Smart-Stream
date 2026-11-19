const list = document.getElementById("channel-list");
const placeholder = document.getElementById("preview-placeholder");
const previewContent = document.getElementById("preview-content");
const previewImage = document.getElementById("preview-image");
const channelNumber = document.getElementById("channel-number");
const channelTitle = document.getElementById("channel-title");
const channelCategory = document.getElementById("channel-category");

const showPreview = (channel) => {
  channelNumber.textContent = channel.channelNumber;
  channelTitle.textContent = channel.name;
  channelCategory.textContent = channel.category;
  previewImage.src = channel.previewImage;
  previewImage.alt = channel.name;

  placeholder.classList.add("hidden");
  previewContent.classList.remove("hidden");
};

export const afficher = (channels, onFavorite) => {
  list.innerHTML = channels
    .map(
      ({ id, channelNumber, name, logo, category, isFavorite }) => `
        <li data-id="${id}" class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-700">
          <img src="${logo}" alt="${name}" class="h-10 w-10 rounded-2xl object-cover">
          <div class="flex-1">
            <p class="text-sm font-medium">${channelNumber} · ${name}</p>
            <p class="text-xs text-gray-400">${category}</p>
          </div>
          <button class="star text-xl text-yellow-400">${isFavorite ? "★" : "☆"}</button>
        </li>`
    )
    .join("");

  list.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      const channel = channels.find((c) => c.id === li.dataset.id);
      showPreview(channel);
    });
  });

  list.querySelectorAll(".star").forEach((button) => {
    button.addEventListener("click", () => {
       onFavorite(button.closest("li").dataset.id);
    });
  });
}; 
