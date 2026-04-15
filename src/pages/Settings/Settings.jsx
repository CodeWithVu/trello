import AppBar from '~/components/AppBar'
import { MdPerson, MdSecurity } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import AccountTab from './AccountTab'
import SecurityTab from './SecurityTab'

// Khai báo đống tabs ra biến const để dùng lại cho gọn
const TABS = {
  ACCOUNT: 'account',
  SECURITY: 'security'
}

function Settings() {
  const location = useLocation()
  // Function đơn giản có nhiệm vụ lấy ra cái tab mặc định dựa theo url.
  const getDefaultTab = () => {
    if (location.pathname.includes(TABS.SECURITY)) return TABS.SECURITY
    return TABS.ACCOUNT
  }
  const activeTab = getDefaultTab()

  return (
    <div className=" bg-slate-50">
      <AppBar />
      <div className=" px-4 py-6">
        <div className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <Link
            to="/settings/account"
            className={`inline-flex  items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === TABS.ACCOUNT
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MdPerson className="text-lg" />
            Account
          </Link>
          <Link
            to="/settings/security"
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === TABS.SECURITY
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MdSecurity className="text-lg" />
            Security
          </Link>
        </div>

        {activeTab === TABS.SECURITY ? <SecurityTab /> : <AccountTab />}
      </div>
    </div>
  )
}

export default Settings
