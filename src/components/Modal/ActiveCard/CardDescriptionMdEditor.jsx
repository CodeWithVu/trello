import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { MdEditNote } from 'react-icons/md'
import { useDarkMode } from '~/hooks/useDarkMode'

// const markdownValueExample = `
//   *\`Markdown Content Example:\`*

//   **Hello world | TrungQuanDev - Một Lập Trình Viên | Trello MERN Stack Advanced**
//   [![](https://avatars.githubusercontent.com/u/14128099?v=4&s=80)](https://avatars.githubusercontent.com/u/14128099?v=4)
//   \`\`\`javascript
//   import React from "react"
//   import ReactDOM from "react-dom"
//   import MDEditor from '@uiw/react-md-editor'
//   \`\`\`
// `
/**
 * Vài ví dụ Markdown từ lib
 * https://codesandbox.io/embed/markdown-editor-for-react-izdd6?fontsize=14&hidenavigation=1&theme=dark
 */
function CardDescriptionMdEditor({ cardDescriptionProp, handleUpdateCardDesctiption }) {
  const [darkMode] = useDarkMode()

  // State xử lý chế độ Edit và chế độ View
  const [markdownEditMode, setMarkdownEditMode] = useState(false)
  // State xử lý giá trị markdown khi chỉnh sửa
  const [cardDescription, setCardDescription] = useState(cardDescriptionProp)

  const updateCardDescription = () => {
    setMarkdownEditMode(false)
    // console.log('cardDescription: ', cardDescription)
  }

  return (
    <div className="-mt-4">
      {markdownEditMode
        ? <div className="mt-5 flex flex-col gap-1">
          <div data-color-mode={darkMode ? 'dark' : 'light'}>
            <MDEditor
              value={cardDescription}
              onChange={setCardDescription}
              previewOptions={{ rehypePlugins: [[rehypeSanitize]] }} // https://www.npmjs.com/package/@uiw/react-md-editor#security
              height={400}
              preview="edit" // Có 3 giá trị để set tùy nhu cầu ['edit', 'live', 'preview']
              // hideToolbar={true}
            />
          </div>
          <button
            className="interceptor-loading self-end rounded bg-sky-500 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
            onClick={updateCardDescription}
            type="button"
          >
            Save
          </button>
        </div>
        : <div className="flex flex-col gap-2">
          <button
            className="flex items-center gap-1 self-end rounded bg-sky-500 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
            onClick={() => setMarkdownEditMode(true)}
            type="button"
          >
            <MdEditNote className="h-4 w-4" />
            Edit
          </button>
          <div data-color-mode={darkMode ? 'dark' : 'light'}>
            <MDEditor.Markdown
              source={cardDescription}
              style={{
                whiteSpace: 'pre-wrap',
                padding: cardDescription ? '10px' : '0px',
                border:  cardDescription ? '0.5px solid rgba(0, 0, 0, 0.2)' : 'none',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default CardDescriptionMdEditor
