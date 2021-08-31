import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Message } from './Message'

const MessagesLayout = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  height: calc(100vh - 64px - 96px);
  overflow-y: auto;
  z-index: 0;
`

export const Messages = ({msgs}) => {
  const [scrollToBottom, setScrollToBottom] = useState(true)
  const ref = useRef(null)
  const prevScrollHeight = useRef(0)
  useEffect(() => {
    if (prevScrollHeight.current - ref.current.scrollTop < ref.current.clientHeight + 10) {
      // We were at the bottom of the screen based on the previous messages received.
      // So scroll all the way down to track the new messages.
      ref.current.scrollTop = ref.current.scrollHeight
      prevScrollHeight.current = ref.current.scrollHeight
    }
  }, [msgs])
  return (
    <MessagesLayout ref={ref} >
      { msgs.map(msg => <Message key={`msg${msg.id}`} msg={msg} />) }
    </MessagesLayout>
  )
}
