import { forwardRef } from "react"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"
import {
  actionIconContainer,
  actionItemDotStyle,
  actionItemLeftStyle,
  applyActionItemContainerStyle,
  applyActionItemTitleStyle,
  timeStyle,
  warningCircleStyle,
} from "./style"
import { WarningCircleIcon } from "@illa-design/icon"
import { useTranslation } from "react-i18next"
import { ActionListItemProps } from "@/page/App/components/Actions/ActionListItem/interface"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { configActions } from "@/redux/config/configSlice"
import { getSelectedAction } from "@/redux/config/configSelector"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"

const Item = DropList.Item

export const ActionListItem = forwardRef<HTMLDivElement, ActionListItemProps>(
  (props, ref) => {
    const { action, onItemClick } = props

    const { t } = useTranslation()
    const selectedAction = useSelector(getSelectedAction)

    const error = useSelector((state: RootState) => {
      return state.currentApp.executionTree.execution.error[action.displayName]
    })

    const isChanged = useSelector((state: RootState) => {
      return (
        state.config.selectedAction?.displayName === action.displayName &&
        selectedAction !== action
      )
    })

    return (
      <Dropdown
        position="br"
        trigger="contextmenu"
        dropList={
          <DropList width={"184px"}>
            <Item
              key={"rename"}
              title={t("editor.action.action_list.contextMenu.rename")}
            />
            <Item
              key={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
            />
            <Item
              key={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
            />
          </DropList>
        }
      >
        <div
          css={applyActionItemContainerStyle(
            selectedAction?.displayName === action.displayName,
          )}
          ref={ref}
          onClick={() => {
            onItemClick(action)
          }}
        >
          <div css={actionItemLeftStyle}>
            <div css={actionIconContainer}>
              {getIconFromActionType(action.actionType, "16px")}
              {error && <WarningCircleIcon css={warningCircleStyle} />}
            </div>
            <div css={applyActionItemTitleStyle(error !== undefined)}>
              {action.displayName}
            </div>
            {isChanged && <div css={actionItemDotStyle} />}
          </div>
          <div css={timeStyle}>0.7s</div>
        </div>
      </Dropdown>
    )
  },
)