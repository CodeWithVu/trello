import AppBar from '~/components/AppBar'
import PageLoading from '~/components/Loading/PageLoading'
import { Link, useLocation } from 'react-router-dom'
import { MdArrowForward, MdChecklist, MdHome, MdSpaceDashboard } from 'react-icons/md'
import randomColor from 'randomcolor'
import SidebarCreateBoardModal from './create'
import { fetchBoardAPI } from '~/apis'
import { useState, useEffect } from 'react'
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'


const sidebarItemBaseClass = 'flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-3 text-slate-700 transition hover:bg-slate-100 dark:bg-[#1A2027] dark:text-slate-200 dark:hover:bg-[#33485D]'

function Boards() {
  // Số lượng bản ghi boards hiển thị tối đa trên 1 page tùy dự án (thường sẽ là 12 cái)
  const [boards, setBoards] = useState([])
  // Tổng toàn bộ số lượng bản ghi boards có trong Database mà phía BE trả về để FE dùng tính toán phân trang
  const [totalBoards, setTotalBoards] = useState()

  // Xử lý phân trang từ url
  const location = useLocation()
  /**
   * Parse chuỗi string search trong location về đối tượng URLSearchParams trong JavaScript
   * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
   */
  const query = new URLSearchParams(location.search)
  /**
   * Lấy giá trị page từ query, default sẽ là 1 nếu không tồn tại page từ url.
   *  hàm parseInt cần tham số thứ 2 là Hệ thập phân (hệ đếm cơ số 10) để đảm bảo chuẩn số cho phân trang
   */
  const page = parseInt(query.get('page') || '1', 10)
  const totalPages = Math.ceil((totalBoards || 0) / DEFAULT_ITEMS_PER_PAGE)

  const updateStateData = (res) => {
    setBoards(res.boards || [])
    setTotalBoards(res.totalBoards || 0)
  }

  // mỗi khi cái url thay đổi thì cái location search lấy từ hook useLocation của react-router-dom cũng thay đổi theo
  // đồng nghĩa useEffect sẽ chạy lại và fetchApi theo đúng page vì location.search nằm trong dependencies của useEffect
  useEffect(() => {
    fetchBoardAPI(location.search).then(updateStateData)
  }, [location.search])

  const afterCreateNewBoard = () => {
    fetchBoardAPI(location.search).then(updateStateData)
  }


  // Lúc chưa tồn tại boards > đang chờ gọi api thì hiện loading
  if (!boards) {
    return <PageLoading caption="Loading Boards..." />
  }

  return (
    <div className="w-full">
      <AppBar />
      <div className="mx-auto my-4 flex w-full max-w-400 px-2 sm:my-8 sm:px-4">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-12">
          <aside className="sm:col-span-3">
            <div className="flex flex-col gap-2">
              <div className={`${sidebarItemBaseClass} bg-blue-50 text-blue-700 dark:bg-[#1A2027] dark:text-blue-300`}>
                <MdSpaceDashboard className="text-lg" />
                Boards
              </div>
              <div className={sidebarItemBaseClass}>
                <MdChecklist className="text-lg" />
                Templates
              </div>
              <div className={sidebarItemBaseClass}>
                <MdHome className="text-lg" />
                Home
              </div>
            </div>
            <div className="my-2 border-t border-slate-200 dark:border-slate-700" />
            <div className="flex flex-col gap-2">
              <SidebarCreateBoardModal afterCreateNewBoard={afterCreateNewBoard}/>
            </div>
          </aside>

          <main className="sm:col-span-9">
            <h1 className="mb-6 text-3xl font-bold text-slate-800 dark:text-slate-100">Your boards:</h1>

            {/* Trường hợp gọi API nhưng không tồn tại cái board nào trong Database trả về */}
            {boards?.length === 0 &&
              <p className="mb-6 font-semibold text-slate-700 dark:text-slate-200">No result found!</p>
            }

            {/* Trường hợp gọi API và có boards trong Database trả về thì render danh sách boards */}
            {boards?.length > 0 &&
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {boards.map(b =>
                  <div key={b._id}>
                    <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs transition hover:shadow-md dark:border-slate-700 dark:bg-[#1A2027]">
                      {/* Ý tưởng mở rộng về sau làm ảnh Cover cho board  */}
                      {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                      <div className="h-12.5" style={{ backgroundColor: randomColor() }} />

                      <div className="space-y-2 p-3">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                          {b?.title}
                        </h2>
                        <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                          {b?.description}
                        </p>
                        <Link
                          to={`/boards/${b._id}`}
                          className="mt-1 flex items-center justify-end gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Go to board <MdArrowForward className="text-base" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }

            {/* Trường hợp gọi API và có totalBoards trong Database trả về thì render khu vực phân trang  */}
            {(totalBoards > 0) &&
              <div className="my-6 flex items-center justify-end gap-2">
                <Link
                  to="/boards"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  First
                </Link>

                <Link
                  to={`/boards${page <= 2 ? '' : `?page=${page - 1}`}`}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Prev
                </Link>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((itemPage) => (
                  <Link
                    key={itemPage}
                    to={`/boards${itemPage === DEFAULT_PAGE ? '' : `?page=${itemPage}`}`}
                    className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                      itemPage === page
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {itemPage}
                  </Link>
                ))}

                <Link
                  to={`/boards?page=${Math.min(totalPages, page + 1)}`}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Next
                </Link>

                <Link
                  to={`/boards?page=${totalPages}`}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Last
                </Link>
              </div>
            }
          </main>
        </div>
      </div>
    </div>
  )
}

export default Boards
