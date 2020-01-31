import React from 'react'
import { Button, Container } from 'reactstrap'

class Widget extends React.Component {

    showWidget = (widget) => {
        widget.open()
    }

    render() {
        let widget = window.cloudinary.createUploadWidget({ 
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_NAME }, 
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.secure_url)

                    // set the state here for photo
                    this.props.updateUser()

                    // fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
                    //     method: 'PUT',
                    //     body: JSON.stringify({ photo: result.info.secure_url }),
                    //     headers: { 
                    //         'Content-Type': 'application/json'
                    //     }
                    // })
                    // .then((response) => response.json())
                    // .then((result) => {
                    //     console.log('result is', result)
                    //     //set the new photo here
                    // })
                    // .catch((error) => {
                    //     console.log('error', error)
                    // })
                }
        })

        return (
        <Container className="web-body">
            <Button onClick={ () => this.showWidget(widget) }>
                Upload Image
            </Button>
        </Container>
        )
    }
}

export default Widget