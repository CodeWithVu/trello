import Tooltip from '~/components/ui/Tooltip'
import Card from '~/components/ui/Card'
import CardMedia from '~/components/ui/Card/CardMedia'
import CardContent from '~/components/ui/Card/CardContent'
import Button from '~/components/ui/Button'

import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { AiOutlineDown } from 'react-icons/ai'
import { MdAddCard,
  MdOutlineContentCut, MdOutlineContentCopy,
  MdContentPaste, MdDeleteForever,
  MdOutlineArchive, MdDragHandle,
  MdGroup, MdAttachFile }
  from 'react-icons/md'
import { BiSolidCommentDetail } from 'react-icons/bi'


const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '70px'


function BoardContent() {
  return (
    <div className="w-full h-(--board-content-height) bg-[#015FDD] dark:bg-[#34495e] py-2">
      <div className="bg-inherit flex items-start overflow-x-auto overflow-y-hidden pb-2 w-full h-full
      [&::-webkit-scrollbar]:pt-4
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-black/10
      [&::-webkit-scrollbar-thumb]:bg-white/50
      [&::-webkit-scrollbar-thumb]:rounded-full">
        {/* column card */}
        <div className="shrink-0 min-w-67.5 max-w-67.5 max-h-[calc(var(--board-content-height)-30px)] bg-[#ebecf0] dark:bg-[#333643] ml-2 first:ml-2.5 last:mr-2.5 mb-10 rounded-md flex flex-col">
          {/* Header */}
          <div
            className="shrink-0 px-4 py-3 flex items-center justify-between"
            style={{ height: COLUMN_HEADER_HEIGHT }}
          >
            <span className="font-semibold text-lg">Column title</span>
            <div>
              <Menu >
                <MenuButton className="inline-flex items-center pr-0 py-1.5 text-sm/6  cursor-pointer focus:not-data-focus:outline-none">
                  <Tooltip content="More actions"> <AiOutlineDown /></Tooltip>
                </MenuButton>
                <MenuItems
                  modal={false}
                  transition
                  anchor="bottom start"
                  className="w-48 origin-top-right rounded-xl border border-white/5 bg-white  p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                >
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdAddCard />
                    Create new card
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdOutlineContentCut />
                      Cut
                    </button>
                  </MenuItem>
                  <div className="my-1 h-px bg-white/5" />
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdOutlineContentCopy />
                      Copy
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdContentPaste />
                    Paste
                    </button>
                  </MenuItem>
                  <MenuSeparator className="my-2 h-px bg-gray-300" />
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdDeleteForever />
                      Remove this column
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdOutlineArchive />
                      Archive this column
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>

          {/* List cards */}
          <div className="flex flex-col -h-0 overflow-y-auto overflow-x-hidden px-1.25 mx-1.25
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-md
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <Card>
              <CardMedia image="https://m.yodycdn.com/blog/jerry-meme-yodyvn10.jpg"/>
              <CardContent>
                <h1 className="text-md">Vũ Nguyễn Mernstack</h1>
              </CardContent>
              <div className="flex justify-between">
                <Button className="py-1 outline-none border-none flex items-center gap-2  leading-6">
                  <MdGroup className="text-lg"/>
                  <span className="text-sm">20</span>
                </Button>
                <Button className="py-1 outline-none border-none flex items-center gap-2 leading-6">
                  <BiSolidCommentDetail className="text-lg"/>
                  <span className="text-sm">20</span>
                </Button>
                <Button className="py-1 outline-none border-none flex items-center gap-2 leading-6">
                  <MdAttachFile className="text-lg"/>
                  <span className="text-sm">20</span>
                </Button>
              </div>
            </Card>

            <Card>
              <CardContent>
                <h1 className="text-md">Card 01</h1>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h1 className="text-md">Card 01</h1>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h1 className="text-md">Card 01</h1>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h1 className="text-md">Card 01</h1>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h1 className="text-md">Card 01</h1>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h1 className="text-md">Card 01</h1>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div
            className="px-4 flex items-center justify-between shrink-0"
            style={{ height: COLUMN_FOOTER_HEIGHT }}>
            <button className="flex items-center gap-2 text-(--color-primary)">
              <MdAddCard />
              Add new card
            </button>
            <Tooltip content="Drag to move"><MdDragHandle /></Tooltip>
          </div>

        </div>

        {/* Column 2 */}
        <div className="shrink-0 min-w-67.5 max-w-67.5 max-h-[calc(var(--board-content-height)-30px)] bg-[#ebecf0] dark:bg-[#333643] ml-2 first:ml-2.5 last:mr-2.5 mb-10 rounded-md flex flex-col">
          {/* Header */}
          <div
            className="shrink-0 px-4 py-3 flex items-center justify-between"
            style={{ height: COLUMN_HEADER_HEIGHT }}
          >
            <span className="font-semibold text-lg">Column title</span>
            <div>
              <Menu >
                <MenuButton className="inline-flex items-center pr-0 py-1.5 text-sm/6  cursor-pointer focus:not-data-focus:outline-none">
                  <Tooltip content="More actions"> <AiOutlineDown /></Tooltip>
                </MenuButton>
                <MenuItems
                  modal={false}
                  transition
                  anchor="bottom start"
                  className="w-48 origin-top-right rounded-xl border border-white/5 bg-white  p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                >
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdAddCard />
                    Create new card
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdOutlineContentCut />
                      Cut
                    </button>
                  </MenuItem>
                  <div className="my-1 h-px bg-white/5" />
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdOutlineContentCopy />
                      Copy
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdContentPaste />
                    Paste
                    </button>
                  </MenuItem>
                  <MenuSeparator className="my-2 h-px bg-gray-300" />
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdDeleteForever />
                      Remove this column
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1 data-focus:bg-[#d5eff5]">
                      <MdOutlineArchive />
                      Archive this column
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>

          {/* List cards */}
          <div className="flex flex-col grow min-h-0 overflow-y-auto overflow-x-hidden px-1.25 mx-1.25
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-md
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <Card>
              <CardMedia image="https://m.yodycdn.com/blog/jerry-meme-yodyvn10.jpg"/>
              <CardContent>
                <h1 className="text-md">Vũ Nguyễn Mernstack</h1>
              </CardContent>
              <div className="flex justify-between">
                <Button className="py-1 outline-none border-none flex items-center gap-2  leading-6">
                  <MdGroup className="text-lg"/>
                  <span className="text-sm">20</span>
                </Button>
                <Button className="py-1 outline-none border-none flex items-center gap-2 leading-6">
                  <BiSolidCommentDetail className="text-lg"/>
                  <span className="text-sm">20</span>
                </Button>
                <Button className="py-1 outline-none border-none flex items-center gap-2 leading-6">
                  <MdAttachFile className="text-lg"/>
                  <span className="text-sm">20</span>
                </Button>
              </div>
            </Card>

            <Card>
              <CardContent>
                <h1 className="text-md">Card 01</h1>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div
            className="px-4 flex items-center justify-between shrink-0"
            style={{ height: COLUMN_FOOTER_HEIGHT }}>
            <button className="flex items-center gap-2 text-(--color-primary)">
              <MdAddCard />
              Add new card
            </button>
            <Tooltip content="Drag to move"><MdDragHandle /></Tooltip>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BoardContent