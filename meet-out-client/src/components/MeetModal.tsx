import React from 'react'
import MeetModalBody from './MeetModalBody'
import MeetModalFooter from './MeetModalFooter'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Decoded } from '../App'
import {MeetForCalendar} from './Content'



interface MeetModalProps {
    className?: string,
    user: Decoded | null,
    currentMeet: MeetForCalendar | null,
    modal: boolean,
    updateMeet: (currentMeet: MeetForCalendar | null) => void,
    toggle: () => void
}


const MeetModal: React.FC<MeetModalProps> = props => {
    
    const {className} = props;

    if(props.user && props.currentMeet){

    return (
        <div>
                <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
                <ModalHeader toggle={props.toggle}><h2>{props.currentMeet?.title}</h2></ModalHeader>
                <ModalBody>
                    <MeetModalBody currentMeet={props.currentMeet} user={props.user} />
                </ModalBody>
                
                <ModalFooter>
                    <MeetModalFooter toggle={props.toggle} currentMeet={props.currentMeet} user={props.user} updateMeet={props.updateMeet}/>
                </ModalFooter>
                </Modal>
          </div>
    )
}else {
    return(
        <div>
                <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
                    <ModalHeader toggle={props.toggle}><h1>No Meet Selected</h1></ModalHeader>
                    <ModalBody>
                        <p>Please select a Meet view more details</p>
                    </ModalBody>
                </Modal>
          </div>
    )
}
}

export default MeetModal