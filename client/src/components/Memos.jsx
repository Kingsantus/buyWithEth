import { useEffect, useState } from "react";
import { DateTime } from 'luxon'

const Memos=({state})=>{
    const [memos, setMemos] = useState([]);
    const {contract} = state;

    useEffect(()=>{
        const memosMessage = async()=>{
            const memos = await contract.getMemos();
            setMemos(memos);
            // console.log(memos);
        }
        contract && memosMessage();
    }, [contract])
    return (
        <>
          {memos.map((memo) => (
            <div key={memo.id}> {/* Use a unique identifier for the key */}
              <p>{memo.name}</p>
              <p>{memo.message}</p>
              <p>{DateTime.fromSeconds(Number(memo.timestamp)).toLocaleString(DateTime.DATETIME_FULL)}</p>
              <p>{memo.from}</p>
            </div>
          ))}
        </>
      );
}

export default Memos;