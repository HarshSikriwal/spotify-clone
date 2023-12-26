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

  const doc = parser.parseFromString(html, "text/html");
  const title = doc.head.getElementsByTagName("title").item(0)?.textContent;

  let text = "";
  const pTags = Array.from(doc.body.getElementsByTagName("p"));

  for (let ptag of pTags) {
    text += extractText(ptag);
  }
  return { title, text };
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

export const generateAudio = async (text: string) => {
  if (!text) return;
  try {
    const response = await fetch("/tts", {
      method: "POST",
      body: text,
    });
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error generating audio:", error);
    return new Error("Error generating audio");
  }
};

export default getArticleDetails;
