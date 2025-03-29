import React from 'react'

interface ChatWizardSecondProps {
    err: boolean,
    orgName: string,
    setOrgName: (value: string) => void,
    orgWeb: string,
    setOrgWeb: (value: string) => void,
}

const ChatWizardSecond : React.FC<ChatWizardSecondProps> = ({ err, orgName, setOrgName, orgWeb, setOrgWeb }) => {
    
  return (
    <div className='chat_wizard_setup_second'>
        <div className='chat_wizard_setup_second_input_box'>
            <label className='chat_wizard_setup_second_input_box_label'>
               Your organisation's name
               <span style={{color: 'red'}}>*</span>
            </label>
            <input type="text" style={{borderColor: err ? "red" : ""}} placeholder='e.g Alquify' value={orgName} onChange={(e) => setOrgName(e.target.value)} className='chat_wizard_setup_second_input_box_field' />
        </div>

        <div className='chat_wizard_setup_second_input_box'>
            <label className='chat_wizard_setup_second_input_box_label'>
                Your organisation's website
                <span style={{color: 'red'}}>*</span>
            </label>
            <input type="text" style={{borderColor: err ? "red" : ""}} placeholder='without the initial e.g alquify.com' value={orgWeb} onChange={(e) => setOrgWeb(e.target.value)} className='chat_wizard_setup_second_input_box_field' />
        </div>

        <div className='chat_wizard_setup_second_notice'>
            Please enter a valid website for compatibility

        </div>
    </div>
  )
}

export default ChatWizardSecond