const getArticleDetails = async (url: string) => {
  const res = await fetch("/parse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  console.log(res, "res");
  const html = await res.text();
  const parser = new DOMParser();
  console.log(html, "html");
  const doc = parser.parseFromString(html, "text/html");
  console.log(doc);
  let text = "";
  const pTags = Array.from(doc.body.getElementsByTagName("p"));
  console.log(pTags);
  const children = [];
  for (let ptag of pTags) {
    text += extractText(ptag);
    children.push(ptag);
  }
  return text;
};

function extractText(node: HTMLElement) {
  let text = "";
  for (let child of Array.from(node.childNodes)) {
    if (child.nodeType === 3) {
      text += child.textContent;
      continue;
    }
    text += extractText(child as HTMLElement);
  }
  return text;
}

export default getArticleDetails;
