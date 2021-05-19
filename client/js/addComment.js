import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentInfo = document.getElementById("jsCommentInfo");
// const commentAuthor = document.getElementById("jsCommentAuthor");
// const commentDate = document.getElementById("jsCommentDate");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, commentAuthors, commentDay) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const span = document.createElement("span");
  const divDate = document.createElement("div");
  const divAuthor = document.createElement("div");
  div.classList.add("comments__info");
  divDate.innerHTML = `${commentDay}`;
  divAuthor.innerHTML = `${commentAuthors}`;
  span.innerHTML = comment;
  li.appendChild(span);
  div.appendChild(divDate);
  div.appendChild(divAuthor);
  commentList.prepend(li);
  commentList.prepend(div);
  increaseNumber();
};

const sendComment = async (comment) => {
  const date = new Date();
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios(`/api/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    const commentAuthors = response.data.commentAuthor;
    const commentDay = response.data.commentDate;
    addComment(comment, commentAuthors, commentDay);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
  console.log(commentInput);
};

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);
};

if (addCommentForm) {
  init();
}
