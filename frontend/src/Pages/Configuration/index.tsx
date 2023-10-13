import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { ModelCard } from '../../Components';

interface ConfigurationProps {
  // Define any props you need for your configuration page here
}

const Configuration: React.FC<ConfigurationProps> = (props) => {
  // Implement your configuration page here
  return (
      <div className="cs2 ce11">
      <HashLink to="/">{`Generation >`}</HashLink>
      <h2>Bedrock Endpoint Configurations</h2>
      <ModelCard
        modelState={true}
        isStarting={false}
        task="Text to Image"
        instance="ml.g5.8xlarge"
        price={3.62}
        source={'Bedrock'}
        instancePrompt=''
        modelName='Stable Diffusion XL v0.8'/>
      <h2>Sagemaker Endpoint Configurations</h2>   
      <ModelCard
        modelState={false}
        isStarting={false}
        task="Text to Image"
        instance="ml.g5.8xlarge"
        price={3.62}
        source={'Sagemaker'}
        instancePrompt='style of Miro Corporate Identity'
        modelName='Miro Corporate Identity (Quick)'/>
      <ModelCard
        modelState={false}
        isStarting={false}
        task="Text to Image"
        instance="ml.r5.4xlarge"
        price={1.35}
        source={'Sagemaker'}
        instancePrompt='style of Miro Corporate Identity'
        modelName='Miro Corporate Identity (Slow)'/>
      <ModelCard
        modelState={false}
        isStarting={false}
        task="Text to Image"
        instance="ml.p3.2xlarge"
        price={4.13}
        source={'Sagemaker'}
        instancePrompt=''
        modelName='Voxel Style'/>
    </div>
  );
};

export default Configuration;
