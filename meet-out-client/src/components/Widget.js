import React from 'react'
import { Button, Container } from 'reactstrap'


class Widget extends React.Component {
    
    checkUploadResult = (resultEvent) => {
        if (resultEvent === 'success') {
            console.log(resultEvent.info.secure_url)
        }
    }

    showWidget = (widget) => {
        console.log('Upload was clicked')
        widget.open()
    }

    render() {
        let widget = window.cloudinary.createUploadWidget({ 
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_NAME }, 
            (error, result) => {
                console.log('Error', error)
                console.log(result)
                this.checkUploadResult(result)
        })

        return (
        <Container className="web-body">
            <Button onClick={ () => this.showWidget(widget)}>
                Upload Image
            </Button>
        </Container>
        )
    }
}

export default Widget