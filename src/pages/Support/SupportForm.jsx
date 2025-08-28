import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveForm } from '../../_slices/supportSlice';
import { supportSchema, ISSUE_TYPES, TAGS } from '../../_utils/validationSchemas';
import { Box, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, Paper } from '@mui/material';

const classes = {
    boxContainer: {
        maxWidth: 600,
        mx: 'auto',
        mt: 4
    },
    paperContainer: {
        padding: 3
    },
    formHeader: {
        textAlign: 'center',
        mb: 3
    },
    scrollableBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      pt: 1
    },
    stepBox: {
        display: 'flex',
        gap: 1,
        alignItems: 'flex-start', // keeps button at top when there is an error message
    },
    removeButton: {
        height: 40
    },
    stepButton: {
        mt: 1,
    },
    submitButton: {
        mt: 1
    }
}

export default function SupportForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(supportSchema),
        defaultValues: { fullName: '', email: '', issueType: '', tags: [], steps: [{ value: '' }] },
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'steps' });

    const onSubmit = (data) => {
        dispatch(saveForm(data));
        navigate('/confirmation');
    };

    return (
        <Box sx={classes.boxContainer}>
            <Paper elevation={3} sx={classes.paperContainer}>
                <Typography variant="h4" sx={classes.formHeader}>Support Request Form</Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Full Name"
                                fullWidth
                                size="small"
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                                {...register('fullName')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                size="small"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register('email')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth size="small" error={!!errors.issueType}>
                                <InputLabel id="issue-type-label">Issue Type</InputLabel>
                                <Controller
                                    name="issueType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            {...field}
                                            labelId="issue-type-label" 
                                            input={<OutlinedInput label="Issue Type" />}
                                        >
                                            {ISSUE_TYPES.map(type => 
                                                <MenuItem key={type} value={type}>{type}</MenuItem>)
                                            }
                                        </Select>
                                    )}
                                />
                                <Typography variant="caption" color="error">{errors.issueType?.message}</Typography>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="tags-label">Tags</InputLabel>
                                <Controller
                                    name="tags"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            multiple
                                            {...field}
                                            labelId="tags-label" 
                                            input={<OutlinedInput label="Tags" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            >
                                            {TAGS.map(tag => (
                                                <MenuItem key={tag} value={tag}>
                                                    <Checkbox checked={field.value.includes(tag)} />
                                                    <ListItemText primary={tag} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <Box>
                                <Typography variant="h6">Steps to Reproduce</Typography>
                                <Box
                                    sx={{...classes.scrollableBox, maxHeight: fields.length > 5 ? 250 : 'auto', overflowY: fields.length > 5 ? 'auto' : 'visible'}}
                                >
                                    {fields.map((field, idx) => (
                                        <Box key={field.id} sx={classes.stepBox}>
                                            <TextField
                                                label={`Step ${idx + 1}`}
                                                fullWidth
                                                size="small"
                                                error={!!errors?.steps?.[idx]?.value}
                                                helperText={errors?.steps?.[idx]?.value?.message}
                                                {...register(`steps.${idx}.value`)}
                                            />
                                            <Button sx={classes.removeButton} variant="outlined" color="error" onClick={() => remove(idx)} disabled={fields.length === 1}>
                                                Remove
                                            </Button>
                                        </Box>
                                    ))}
                                </Box>
                                <Button sx={classes.stepButton} variant="outlined" color="success" onClick={() => append({ value: '' })}>+ Add Step</Button>
                            </Box>
                        </Grid>
                        <Button sx={classes.submitButton} type="submit" variant="contained" fullWidth>Submit</Button>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}