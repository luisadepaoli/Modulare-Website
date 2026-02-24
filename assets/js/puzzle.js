document.addEventListener("DOMContentLoaded", () => {

  const pieces = document.querySelectorAll(".piece");
  const slots = document.querySelectorAll(".slot");
  let correct = 0;

  pieces.forEach(piece => {
    piece.addEventListener("dragstart", e => {
      e.dataTransfer.setData("id", piece.id);
    });
  });

  slots.forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());

    slot.addEventListener("drop", e => {
      e.preventDefault();
      const pieceId = e.dataTransfer.getData("id");

      if (
        pieceId === slot.dataset.piece &&
        !slot.classList.contains("filled")
      ) {
        slot.appendChild(document.getElementById(pieceId));
        slot.classList.add("filled");
        correct++;

        if (correct === slots.length) {
          document.getElementById("reward").style.display = "block";
        }
      }
    });
  });

});
