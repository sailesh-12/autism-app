import { 
    Gift,
    Mic,
    Users,
    MessageSquare,
    CheckCircle,
    Clock,
    Droplet,
    Music,
    Menu,
    X
  } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';
  import './SideBar.css';
  
  export default function Sidebar({ sidebarOpen, toggleSidebar }) {
    const navigate = useNavigate();
  
    return (
      <div className={`bg-blue-900 text-white transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed h-full z-10`}>
        <div className="p-4 flex items-center justify-between sticky top-0 bg-blue-900 z-20">
          {sidebarOpen ? (
            <>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <h1 className="ml-3 text-xl font-bold">AutiPal</h1>
              </div>
              <button onClick={toggleSidebar} className="text-white p-1 rounded-full hover:bg-blue-800">
                <X size={20} />
              </button>
            </>
          ) : (
            <div className="relative w-full flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                A
              </div>
              <button onClick={toggleSidebar} className="text-white p-1 rounded-full hover:bg-blue-800 absolute top-12">
                <Menu size={20} />
              </button>
            </div>
          )}
        </div>
  
        <div className={`flex-1 ${sidebarOpen ? 'mt-8' : 'mt-16'}`}>
          <ul>
            <li className="mb-4">
              <button onClick={() => navigate('/daily-activity-reward')} className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg mx-2 w-full text-left">
                <Gift size={20} />
                {sidebarOpen && <span className="ml-3">Daily Activity Reward</span>}
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => navigate('/speech-enhancer')} className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg mx-2 w-full text-left">
                <Mic size={20} />
                {sidebarOpen && <span className="ml-3">Speech Enhancer</span>}
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => navigate('/community-forum')} className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg mx-2 w-full text-left">
                <Users size={20} />
                {sidebarOpen && <span className="ml-3">Community Forum</span>}
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => navigate('/chatbot')} className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg mx-2 w-full text-left">
                <MessageSquare size={20} />
                {sidebarOpen && <span className="ml-3">Chatbot</span>}
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => navigate('/to-do-tasks')} className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg mx-2 w-full text-left">
                <CheckCircle size={20} />
                {sidebarOpen && <span className="ml-3">To-Do Tasks</span>}
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => navigate('/pomodoro-timer')} className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg mx-2 w-full text-left">
                <Clock size={20} />
                {sidebarOpen && <span className="ml-3">Pomodoro Timer</span>}
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => { console.log('Hydration Tracker clicked'); navigate('/hydration-tracker'); }} className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg mx-2 w-full text-left">
                <Droplet size={20} />
                {sidebarOpen && <span className="ml-3">Hydration Tracker</span>}
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => navigate('/mood-sounds')} className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg mx-2 w-full text-left">
                <Music size={20} />
                {sidebarOpen && <span className="ml-3">Mood Sounds</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }