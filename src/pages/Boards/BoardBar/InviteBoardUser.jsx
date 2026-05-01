import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { MdPersonAdd } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, FIELD_REQUIRED_MESSAGE, EMAIL_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import Tooltip from '~/components/ui/Tooltip'
import { inviteUserToBoardAPI } from '~/apis'
import { socketIoInstance } from '~/socketClient'

function InviteBoardUser({ boardId }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const submitInviteUserToBoard = (data, closePopover) => {
    const { inviteeEmail } = data
    // console.log('inviteeEmail:', inviteeEmail)

    //Gọi api mời một người dùng nào đó vào làm thành viên của board
    inviteUserToBoardAPI({ inviteeEmail, boardId }).then(invitation => {
    // Clear thẻ input sử dụng react-hook-form bằng setValue
      setValue('inviteeEmail', null)
      closePopover()

      // Mời một người dùng vào board xong thì cũng sẽ gửi email/emit sự kiện lên server( tính ăng real time)
      socketIoInstance.emit('FE_USER_INVITED_TO_BOARD', invitation)
    })
  }

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Tooltip content="Invite user to this board!">
            <PopoverButton className="flex items-center gap-1.5 rounded border border-white px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/20">
              <MdPersonAdd className="h-5 w-5" />
              Invite
            </PopoverButton>
          </Tooltip>

          <PopoverPanel
            transition
            className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-xl transition data-closed:translate-y-1 data-closed:opacity-0 dark:border-slate-700 dark:bg-[#1A2027]"
          >
            <form onSubmit={handleSubmit((data) => submitInviteUserToBoard(data, close))} className="flex flex-col gap-4 p-5">
              <span className="text-base font-bold text-slate-800 dark:text-white">
                Invite User To This Board!
              </span>

              <div>
                <input
                  autoFocus
                  className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none transition-colors hover:border-slate-400 focus:border-blue-500 dark:border-slate-600 dark:text-slate-100 dark:hover:border-slate-500"
                  placeholder="Enter email to invite..."
                  type="text"
                  {...register('inviteeEmail', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName={'inviteeEmail'} />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="interceptor-loading rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Invite
                </button>
              </div>
            </form>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}

export default InviteBoardUser
