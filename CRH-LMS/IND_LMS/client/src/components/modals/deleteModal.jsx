import question from "../../pages/profile/img/question.svg"

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg text-center">
          {/* Question Mark Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100">
              <span className="text-3xl text-orange-500 font-bold">
                <img className="w-[23vw] h-[23vw] max-w-[92px] max-h-[92px]" src={question} alt="logo" srcset="" />
              </span>
            </div>
          </div>
  
          {/* Confirmation Message */}
          <p className="text-lg text-gray-700">Are you sure you want to delete this Education?</p>
  
          {/* Buttons */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border-2 border-gray-500 rounded-[8px] bg-transparent text-gray-700 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-[#FF702D] text-white rounded-[8px]"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
  