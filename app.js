const form = document.querySelector("#searchForm");
const resultContainer = document.querySelector("#container");

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userInput = document.querySelector("#input");
    const searchTerm = userInput.value;
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    console.log(res.data);
    showResult(res);
    userInput.value= "";

})


function showResult(res) {
    if (document.querySelector("#container div")) {
        for (result of res.data) {
            const resultDiv = document.querySelector("#container div");
            resultDiv.remove();
        }
    }
    for (result of res.data) {
        const resultDiv = document.createElement("div");
        const resultDiv2 = document.createElement("div");
        const resultDiv3 = document.createElement("div");
        const resultTitle = document.createElement("h2");
        resultTitle.innerText = result.show.name;
        const resultImg = document.createElement("img");
        if (result.show.image) {
            resultImg.src = result.show.image.medium;
        }
        else {
            resultImg.src = "imgMissing.png";
        }
        const paragraph = document.createElement("p");
        paragraph.innerHTML = result.show.summary;
        resultDiv3.classList= "movieContainer";
        paragraph.classList = "movieSummary";
        resultDiv.append(resultTitle);
        resultDiv.append(resultImg);
        resultDiv2.append(paragraph);
        resultDiv3.append(resultDiv);
        resultDiv3.append(resultDiv2);
        resultContainer.append(resultDiv3);
    }
}
