import { useSelector } from 'react-redux';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText } from '@mui/material';

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
    }
}

export default function SupportConfirmation() {
    const supportForm = useSelector(state => state.support.supportForm);

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
            </Box>
        )
    );
}
