import { CSSProperties, useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import languages from "~languages"

const storage = new Storage()

const visuallyHidden: CSSProperties = {
  position: "absolute",
  left: "-10000px",
  top: "auto",
  width: "1px",
  height: "1px",
  overflow: "hidden"
}

const formElement: CSSProperties = {
  fontSize: "medium",
  fontWeight: "bold",
  padding: "1rem 2rem"
}

function IndexPopup() {
  const [error, setError] = useState<string>()
  const [sourceLanguage, setSourceLanguage] =
    useState<keyof typeof languages>("auto")
  const [targetLanguage, setTargetLanguage] =
    useState<keyof typeof languages>("auto")

  useEffect(() => {
    storage
      .get("sourceLanguage")
      .then((code) => setSourceLanguage(code as keyof typeof languages))
    storage
      .get("targetLanguage")
      .then((code) => setTargetLanguage(code as keyof typeof languages))
  }, [])
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <div>
        <label htmlFor="source-language-select" style={visuallyHidden}>
          Source language
        </label>
        <select
          id="source-language-select"
          style={formElement}
          value={sourceLanguage}
          onChange={async (e) => {
            setSourceLanguage(e.target.value as keyof typeof languages)
            await storage.set("sourceLanguage", e.target.value)
          }}>
          {Object.entries(languages).map(([code, language]) => (
            <option key={code} value={code}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div style={{ margin: "auto" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.7 17.925q-.35.2-.625-.062Q11.8 17.6 12 17.25L14.425 13H3q-.425 0-.712-.288Q2 12.425 2 12t.288-.713Q2.575 11 3 11h11.425L12 6.75q-.2-.35.075-.613q.275-.262.625-.062l7.975 5.075q.475.3.475.85t-.475.85Z"
          />
        </svg>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="target-language-select" style={visuallyHidden}>
          Target language
        </label>
        <select
          id="target-language-select"
          style={{ ...formElement }}
          value={targetLanguage}
          onChange={async (e) => {
            setTargetLanguage(e.target.value as keyof typeof languages)
            await storage.set("targetLanguage", e.target.value)
          }}>
          {Object.entries(languages).map(([code, language]) => (
            <option key={code} value={code}>
              {language}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <button
          style={formElement}
          onClick={async () => {
            const [activeTab] = await chrome.tabs.query({
              active: true,
              lastFocusedWindow: true
            })
            if (!activeTab || !activeTab.url) {
              setError("Could not get active tab url")
              return
            }
            await chrome.tabs.update({
              url: `https://translate.google.com/translate?sl=${
                sourceLanguage !== "auto" ? sourceLanguage : ""
              }&tl=${targetLanguage !== "auto" ? targetLanguage : ""}&u=${
                activeTab.url
              }&client=webapp`
            })
          }}>
          Translate
        </button>
      )}
    </div>
  )
}

export default IndexPopup
