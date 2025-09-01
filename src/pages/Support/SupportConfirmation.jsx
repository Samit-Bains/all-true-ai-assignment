import { useSelector, useDispatch } from 'react-redux';
import { fetchYesNo, fetchRandomJoke } from '../../_slices/supportSlice';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText, Button, LinearProgress } from '@mui/material';

const classes = {
    noFormText: {
        textAlign: 'center'
    },
    boxContainer: {
        maxWidth: 600,
        mx: 'auto',
        mt: 4
    },
    paperStyle: {
        p: 2
    },
    submissionHeader: {
        textAlign: 'center',
        mb: 5
    },
    listItemStyle: {
        pl: 0
    },
    yesNoPaper: {
        mt: 3,
        p: 2,
        textAlign: 'center'
    },
    apiButton: {
        mt: 3,
        mb: 2
    },
    errorMessage: {
        color: "red"
    }
}

export default function SupportConfirmation() {
    const dispatch = useDispatch();
    const supportForm = useSelector((state) => state.support.supportForm);
    const yesNo = useSelector((state) => state.support.yesNo);
    const joke = useSelector((state) => state.support.joke);

    return (
        !supportForm ? (
            <Typography variant="h3" style={classes.noFormText}>No submission found</Typography>
        ) : (
            <Box sx={classes.boxContainer}>
                <Paper elevation={3} sx={classes.paperStyle}>
                    <Typography sx={classes.submissionHeader} variant="h3" gutterBottom>Submission Confirmation</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="subtitle2" color="text.secondary">Full Name</Typography>
                            <Typography>{supportForm.fullName}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                            <Typography>{supportForm.email}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="subtitle2" color="text.secondary">Issue Type</Typography>
                            <Typography>{supportForm.issueType}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="subtitle2" color="text.secondary">Tags</Typography>
                            <Typography>
                            {supportForm.tags && supportForm.tags.length > 0 
                                ? supportForm.tags.join(", ") 
                                : "None"}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="subtitle2" color="text.secondary">Steps to Reproduce</Typography>
                            {supportForm.steps && supportForm.steps.length > 0 ? (
                                <List dense>
                                    {supportForm.steps.map((step, idx) => (
                                        <ListItem key={idx} sx={classes.listItemStyle}>
                                            <ListItemText primary={`Step ${idx + 1}: ${step.value}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography>None</Typography>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} sx={classes.yesNoPaper}>
                    <Typography variant="h4">Randomly Generate Yes or No</Typography>
                    <div>
                        <Button variant="outlined" onClick={() => dispatch(fetchYesNo())} sx={classes.apiButton}>
                            Ask the API
                        </Button>
                        {yesNo.status === "loading" && <LinearProgress />}
                        {yesNo.status === "succeeded" && <Typography>Answer: {yesNo.value}</Typography>}
                        {yesNo.status === "failed" && <Typography style={classes.errorMessage}>Error: {yesNo.error}</Typography>}
                    </div>
                </Paper>
                <Paper elevation={3} sx={classes.yesNoPaper}>
                    <Typography variant="h4">Randomly Generate Joke</Typography>
                    <div>
                        <Button variant="outlined" onClick={() => dispatch(fetchRandomJoke())} sx={classes.apiButton}>
                            Ask the API
                        </Button>
                        {joke.status === "loading" && <LinearProgress />}
                        {joke.status === "succeeded"  && <Typography>{joke.value.setup} — <strong>{joke.value.punchline}</strong></Typography>}
                        {joke.status === "failed" && <Typography style={classes.errorMessage}>Error: {joke.error}</Typography>}
                    </div>
                </Paper>
            </Box>
        )
    );
}
