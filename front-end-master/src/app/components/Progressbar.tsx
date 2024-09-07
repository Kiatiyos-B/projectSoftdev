import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function Progress_bar() {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col'>
        <div className="flex justify-evenly h-fit">
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={3} alternativeLabel>
              <Step key="1">
                <StepLabel StepIconProps={{
                  style: { color: '#008080' }
                }}>Planning</StepLabel>
              </Step>
              <Step key="2">
                <StepLabel
                  StepIconProps={{
                    style: { color: '#2563EB' }
                  }}
                >Update Progress</StepLabel>
              </Step>
              <Step key="3">
                <StepLabel
                  StepIconProps={{
                    style: { color: '#9333EA' }
                  }}
                >Final Documents</StepLabel>
              </Step>
              <Step key="4">
                <StepLabel
                  StepIconProps={{
                    style: { color: '#E11D48' }
                  }}
                >Presentation</StepLabel>
              </Step>
              <Step key="5">
                <StepLabel
                  StepIconProps={{
                    style: { color: '#D97706', opacity: '0.3' }
                  }}
                >Done</StepLabel>
              </Step>
            </Stepper>
          </Box>
        </div>

      </div>
    </div>
  )
}
