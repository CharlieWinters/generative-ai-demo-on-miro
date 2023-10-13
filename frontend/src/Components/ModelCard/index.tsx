import React, {useState, useEffect} from 'react';
import { setAppData, getAppData } from '../../Services';

interface Props {
  // Define props here
  modelState: boolean;
  isStarting: boolean;
  instance: string;
  task: string;
  price: number;
  modelName: string;
  source: string;
  instancePrompt: string;
}

enum Color {
  ON = "var(--green800)",
  OFF = "var(--indigo400)",
  STARTING = "var(--yellow700)"
}

enum Icon {
  OFF = "M10 8.934a.5.5 0 0 1 .777-.416l4.599 3.066a.5.5 0 0 1 0 .832l-4.599 3.066a.5.5 0 0 1-.777-.416V8.934z",
  ON = "M9 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z",
  STARTING = "m14.975 7.61-2.457 2.458a2 2 0 1 0 1.414 1.414l2.457-2.457a1 1 0 0 0-1.414-1.414z"
}

<svg width="24" height="24"  xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm11-9c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M10 8.934a.5.5 0 0 1 .777-.416l4.599 3.066a.5.5 0 0 1 0 .832l-4.599 3.066a.5.5 0 0 1-.777-.416V8.934z" /></svg>

const ModelCard: React.FC<Props> = (props) => {
  // Component logic here
  const [modelState, setModelState] = useState(props.modelState);
  const [isStarting, setIsStarting] = useState(props.isStarting);
  const [showSettings, setShowSettings] = useState(false);
  const [instancePrompt, setInstancePrompt] = useState(props.instancePrompt);

  const color = modelState ? Color.ON : isStarting ? Color.STARTING : Color.OFF;

  useEffect(() => {
    const fetchData = async () => {
      await getAppData('bedrock_instance_prompt').then((data) => {data ? setInstancePrompt(data) : setInstancePrompt('')})
    };

    fetchData();
  }, []);

  const handleStateChange = (newState: boolean) => {
      setIsStarting(true);
      setTimeout(() => {
        setModelState(newState);
        setIsStarting(false);
      }, 10000);
  };

  const handleSave = async() => {
    const appData = (document.querySelector('#input-instance-prompt') as HTMLInputElement).value;
    await setAppData('bedrock_instance_prompt', appData);
  };

  const handleInstancePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstancePrompt(event.target.value);
  };

  return (
    <div className="app-card" style={{ "--accent-color": color }}>
      <h1 className="app-card--title">{props.modelName}</h1>
      <h1 className="app-card--description p-medium">This model generates images in the style of the corporate identity</h1>
      <div className="app-card--body">
        <div className="app-card--tags">
          <span className="tag">{props.task}</span>
          {props.source === 'Sagemaker' ? (
            <>
              <span className="tag" >{props.instance}</span>
              <span className="tag">${props.price} p/h</span>
            </>
          ): null}
          <span className="tag">{props.source}</span>
        </div>
        <svg className='settings' onClick={() => showSettings ? setShowSettings(false) : setShowSettings(true)} width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z"/>
          <path d="M9.59532 2.68377C9.73143 2.27543 10.1136 2 10.544 2H13.544C13.9744 2 14.3566 2.27543 14.4927 2.68377L15.3727 5.32378L16.1614 5.77922L18.8886 5.22129C19.3102 5.13503 19.7398 5.32825 19.955 5.70099L21.455 8.29899C21.6703 8.67182 21.6228 9.14059 21.3371 9.46264L19.49 11.5446V12.4555L21.3362 14.5375C21.6218 14.8596 21.6692 15.3282 21.454 15.701L19.954 18.299C19.7388 18.6718 19.3092 18.865 18.8875 18.7787L16.1614 18.2208L15.3727 18.6762L14.4927 21.3162C14.3566 21.7246 13.9744 22 13.544 22H10.544C10.1136 22 9.73143 21.7246 9.59532 21.3162L8.71532 18.6762L7.92663 18.2208L5.20049 18.7787C4.77874 18.865 4.34909 18.6717 4.1339 18.2989L2.6339 15.6999C2.41873 15.3271 2.46628 14.8584 2.75193 14.5364L4.598 12.4554V11.5445L2.75179 9.46246C2.46626 9.14045 2.41877 8.67188 2.6339 8.29913L4.1339 5.70013C4.34914 5.32718 4.77896 5.1339 5.2008 5.22037L7.92679 5.77912L8.71532 5.32377L9.59532 2.68377ZM11.2648 4L10.4927 6.31623C10.4154 6.54816 10.2558 6.74373 10.0441 6.86599L8.59807 7.70099C8.38621 7.82332 8.13686 7.86376 7.8972 7.81463L5.50564 7.32443L4.72632 8.67473L6.34621 10.5015C6.50843 10.6845 6.598 10.9205 6.598 11.165V12.835C6.598 13.0796 6.50837 13.3157 6.34607 13.4986L4.7264 15.3244L5.50576 16.6748L7.89751 16.1853C8.13708 16.1363 8.3863 16.1767 8.59807 16.299L10.0441 17.134C10.2558 17.2563 10.4154 17.4518 10.4927 17.6838L11.2648 20H12.8232L13.5953 17.6838C13.6726 17.4518 13.8322 17.2563 14.0439 17.134L15.4899 16.299C15.7017 16.1767 15.9509 16.1363 16.1905 16.1853L18.5824 16.6748L19.3616 15.3252L17.7418 13.4985C17.5796 13.3155 17.49 13.0795 17.49 12.835V11.165C17.49 10.9204 17.5796 10.6843 17.7419 10.5014L19.3625 8.67466L18.5833 7.32516L16.1904 7.81471C15.9509 7.86372 15.7017 7.82326 15.4899 7.70099L14.0439 6.86599C13.8322 6.74373 13.6726 6.54816 13.5953 6.31623L12.8232 4H11.2648Z"/>
        </svg>
        {props.source === 'Sagemaker' ? (
          <svg onClick={() => handleStateChange(!modelState)} className={modelState || isStarting ? 'state-on' : 'state-off'} width="24" height="24"  xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm11-9c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d= {isStarting? Icon.STARTING : modelState ? Icon.ON : Icon.OFF}/>
          </svg>
        ): null}
      </div>
      {showSettings ? (
          <div className="form-group-small centered">
            <br/>
            <label htmlFor="input-instance-prompt">Instance Prompt</label>
            <input className='input' id="input-instance-prompt" type="text" value={instancePrompt} onChange={handleInstancePromptChange} />
            {props.source === 'Sagemaker' ? (
              <>
                <label htmlFor="select-period">Run for how long?</label>
                <select className="select" id="select-period">
                  <option value="1">{`1 hour ($${props.price*1})`} </option>
                  <option value="2">{`2 hour ($${props.price*2})`}</option>
                  <option value="3">{`Continuous ($${props.price} p/h)`}</option>
                </select>
              </>
            ) : null
            }
            <br/>
            <button onClick={() => handleSave()} className="button button-primary button-small" type="button">Save</button>
          </div>
        ) : null}
      </div>
  );
};

export default ModelCard;
