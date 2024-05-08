import React, {useState} from "react";

const Note = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedContent, setUpdatedContent] = useState(props.content);
    
    const handleUpdate = () => {
        props.updateNote(props.id, updatedTitle, updatedContent);
        setEditMode(false);
    };


    return (
        <div className="border-2 px-5 py-2 w-full my-10">
            {
                editMode ? (
                    <div>
                        <input  value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} placeholder="Title" type="text" className="block shadow w-full mx-auto px-2 py-2 my-2 rounded-lg"/>
                        <textarea value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} placeholder="Your updated note here..." type="text" className="block shadow w-full mx-auto my-2 px-2 py-4 rounded-lg"/>
                        <button onClick={handleUpdate} className="bg-blue-400 text-xl text-white px-2 py-1 rounded-lg">
                            Edit
                        </button>
                    </div> 

                ) : (
                    <div className="border-2 px-5 py-2 w-full my-10">
                    <h1 className="flex justify-center items-center py-2 text-xl font-bold">
                        {props.title}
                    </h1>
                    <h2 className="text-justify">
                        {props.content}
                    </h2>
                    <div className="flex justify-center items-center">
                        <button onClick={() => setEditMode(true)} className="py-1 my-2 px-3 bg-blue-400 text-xl text-white rounded-lg mx-2">
                            Edit
                        </button>
                        <button onClick={props.deleteNote} className="py-1 my-2 px-3 bg-red-600 text-xl text-white rounded-lg mx-2">
                            Delete
                        </button>
                    </div>
                </div>
                )
            }

        </div>

    );

};

export default Note;