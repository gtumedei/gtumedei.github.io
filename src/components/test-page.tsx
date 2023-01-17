import { createSignal } from "solid-js"
import Modal from "./ui/modal"
import Popover from "./ui/popover"

const HomePage = () => {
  const [showPopover, setShowPopover] = createSignal(false)
  const [showModal, setShowModal] = createSignal(false)

  return (
    <div>
      <h1 class="section-heading mb-8">Test page</h1>

      <Popover
        show={showPopover()}
        setShow={setShowPopover}
        trigger={<button class="btn btn-accent" onClick={() => setShowPopover(true)}>Show popover</button>}
        class="absolute top-0 right-0 bg-primary-focus p-3 card"
      >
        <div>Popover content</div>
      </Popover>

      <button class="btn btn-accent" onClick={() => setShowModal(true)}>Show modal</button>

      <Modal
        show={showModal()}
        setShow={setShowModal}
      >
        Modal content
      </Modal>
    </div>
  )
}

export default HomePage
