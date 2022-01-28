
            <TextField fullWidth id="outlined-select-currency" select label="Select Branch" value={currency} onChange={handleChange}>
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <br />
            <br />
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="controlled-radio-buttons-group" value={value} onChange={handleChange1}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>
            <FormGroup>
                <FormControlLabel onChange={handleChange2} control={<Switch defaultChecked />} label="Checked" />
            </FormGroup>
            <br />
            <br />
            <br />
            <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
            <br />
            <br />
            <br />
            <FormGroup onClick={handleChange3}>
                <FormControlLabel value="Rikin" control={<Checkbox defaultChecked />} label="Rikin" />
                <FormControlLabel value="Chauhan" control={<Checkbox defaultChecked />} label="Chauhan" />
                <FormControlLabel value="Jenil" control={<Checkbox />} label="Jenil" />
                <FormControlLabel value="Gandhi" control={<Checkbox />} label="Gandhi" />
                <FormControlLabel value="Keval" control={<Checkbox />} label="Keval" />
                <FormControlLabel value="Gandevia" control={<Checkbox />} label="Gandevia" />
            </FormGroup>
            <br />
            <br />
            <br />
            <TextField
                fullWidth
                id="standard-multiline-static"
                label="Sample TextBox"
                multiline
                rows={4}
                variant="outlined"
                helperText="Textbox description here!"
            />
            <br />
            <br />
            <br />
            <Button variant="contained" fullWidth size="large">
                Contained
            </Button>