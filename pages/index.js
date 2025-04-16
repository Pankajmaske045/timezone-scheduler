import { useState } from "react";
import moment from "moment-timezone";

export default function Home() {
  const [meetingTime, setMeetingTime] = useState("");
  const [organizerZone, setOrganizerZone] = useState("Asia/Kolkata");
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState("");
  const [zone, setZone] = useState("America/New_York");

  const allTimeZones = moment.tz.names();

  const handleAddParticipant = () => {
    if (!name.trim()) return;
    setParticipants([...participants, { name, timezone: zone }]);
    setName("");
    setZone("America/New_York");
    document.getElementById("nameInput").focus();
  };

  const handleRemoveParticipant = (index) => {
    const updated = [...participants];
    updated.splice(index, 1);
    setParticipants(updated);
  };

  const getLocalTime = (tz) => {
    if (!meetingTime) return "--:--";
    return moment.tz(meetingTime, organizerZone).tz(tz).format("DD MMM, hh:mm A");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800 p-6 sm:p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">
        🕒 Time Zone Meeting Scheduler
      </h1>

      <div className="grid gap-6 bg-white rounded-xl shadow p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="w-full sm:w-auto font-semibold flex items-center gap-2">
            <span className="text-xl">📅</span>Meeting Time:
          </label>
          <input
            type="datetime-local"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full sm:max-w-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="w-full sm:w-auto font-semibold flex items-center gap-2">
            <span className="text-xl">🌐</span>Organizer Time Zone:
          </label>
          <select
            value={organizerZone}
            onChange={(e) => setOrganizerZone(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full sm:max-w-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {allTimeZones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Add Participants</h2>
        <div className="flex flex-wrap items-center gap-4">
          <input
            id="nameInput"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-44 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {allTimeZones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddParticipant}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow transition duration-150"
          >
            ➕ Add
          </button>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3 text-purple-700">Participant Timezones</h2>
        {participants.length === 0 ? (
          <p className="text-gray-500 italic">No participants added yet.</p>
        ) : (
          <ul className="space-y-3">
            {participants.map((p, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-purple-50 p-3 rounded-lg shadow-sm"
              >
                <div>
                  <strong>{p.name}</strong> ({p.timezone})
                </div>
                <button
                  onClick={() => handleRemoveParticipant(i)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3 text-purple-700">
          Meeting Time for All Participants
        </h2>
        {participants.length === 0 ? (
          <p className="text-gray-500 italic">No participants added yet.</p>
        ) : (
          <ul className="space-y-3">
            {participants.map((p, i) => (
              <li
                key={i}
                className="bg-blue-50 p-3 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <strong>{p.name}</strong> ({p.timezone}):{" "}
                  {getLocalTime(p.timezone)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
