import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface Param {
  key: string;
  value: string;
}

export interface ParamsPanelProps {
  params: Param[];
  addParam: (params: Param[]) => void;
}

export default function ParamsPanel({ addParam, params }: ParamsPanelProps) {
  // const [params, setParams] = useState<Param[]>([]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAdd = () => {
    if (newKey && newValue) {
      addParam([...params, { key: newKey, value: newValue }]);
      setNewKey("");
      setNewValue("");
    }
  };

  const handleRemove = (index: number) => {
    addParam(params.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Parameter key"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Parameter value"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="space-y-2">
        {params.map((param, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
          >
            <div className="flex-1 flex gap-2">
              <span className="font-medium">{param.key}:</span>
              <span>{param.value}</span>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-600"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
