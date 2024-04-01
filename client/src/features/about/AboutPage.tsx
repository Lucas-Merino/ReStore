import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItemText, Typography } from '@mui/material'
import agent from '../../app/api/agent'
import { useState } from 'react'

const AboutPage = () => {

    const [validationErrors, setValidationErrors] = useState<string[]>();

    const getValidationError = () => {
        agent.TestErrors.getValidationError()
        .then(() => console.log('should not see this'))
        .catch(error => setValidationErrors(error))
    }

    return (
        <Container>
            <Typography gutterBottom variant='h2'> Errors for testing purposes </Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
                <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
            </ButtonGroup>
            {validationErrors &&
                <Alert severity='error'>
                    <AlertTitle>Validation errors</AlertTitle>
                    <List>
                        {validationErrors?.map(error => (
                            <List key={error}>
                                <ListItemText>{error}</ListItemText>
                            </List>
                        ))}
                    </List>
                </Alert> 
            }
        </Container>
    )
}

export default AboutPage
