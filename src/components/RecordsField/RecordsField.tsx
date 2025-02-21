import { useEffect, useState } from 'react';
import './RecordsField.sass'


interface recordPropType {
    theme: string;
    record: recordType | null
}

export interface recordType {
    name: string;
    template: string;
    seconds: number
}

const RecordsField = ({theme, record}: recordPropType) => {

    const [listName, setListName] = useState<string[]>([])
    const [listTemplate, setListTemplate] = useState<string[]>([])
    const [listTime, setListTime] = useState<string[]>([])

    useEffect(() => {
        showRecords()
    }, [])

    useEffect(() => {
        if(record) {
            const oldRecords = localStorage.getItem('record')
            if(!oldRecords){
                const newRecord = []
                newRecord.push(record)
                localStorage.setItem('record', JSON.stringify(newRecord))
            } else {
                const oldRecordParse = JSON.parse(oldRecords)
                if(oldRecordParse.length >= 5) oldRecordParse.shift()
                oldRecordParse.push(record)
                localStorage.setItem('record', JSON.stringify(oldRecordParse))
            }
        }
        showRecords()
    }, [record])

    const showRecords = () => {

        const toTimeFormat = (time: number) => {
            let minutes: string = (Math.floor(time/60) < 10) ? `0${Math.floor(time/60)}` : `${Math.floor(time/60)}`
            let seconds: string = (time%60 < 10) ? `0${time%60}` : `${time%60}`
            return `${minutes}:${seconds}`;
        }
        
        const getRecords = localStorage.getItem('record')
        if(getRecords) {
            const saveRecords: recordType[] = JSON.parse(getRecords)
            saveRecords.sort((a: recordType, b: recordType) => a.seconds - b.seconds)
            const listNameLoad = []
            const listTemplateLoad = []
            const listTimeLoad = []
            for(let i = 0; i < saveRecords.length; i++){
                listNameLoad.push(saveRecords[i].name)
                listTemplateLoad.push(saveRecords[i].template)
                listTimeLoad.push(toTimeFormat(saveRecords[i].seconds))
            }
            setListName(listNameLoad)
            setListTemplate(listTemplateLoad)
            setListTime(listTimeLoad)
        }
    }


    const renderItems = (type: string[]) => {
        return type.map((item, index) => <div key={item + index} className='recordsListItem'>{item}</div>)
    }

    return (
        <div className={`recordsField recordsField_${theme}`}>
            <h2 style={{margin: 5}}>Records</h2>
            <div className="recordsList">
                <div className="listName">
                    <div className="recordsListTitle">Name</div>
                    {renderItems(listName)}
                </div>
                <div className="listTemplate">
                    <div className="recordsListTitle">Template</div>
                    {renderItems(listTemplate)}
                </div>
                <div className="listTime">
                    <div className="recordsListTitle">Time</div>
                    {renderItems(listTime)}
                </div>
            </div>
        </div>
    );
};

export default RecordsField;