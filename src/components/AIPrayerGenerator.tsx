"use client";
import { createClient } from "@/lib/supabase/client";
import React, { useState } from "react";

interface GeneratedPrayer {
  intention: string;
  prayer: string;
  prayerType: string;
  liturgicalSeason: string;
  saintDevotion?: string;
  scriptureReferences?: string[];
}

interface AIPrayerGeneratorProps {
  onPrayerGenerated?: (prayer: GeneratedPrayer) => void;
}

export default function AIPrayerGenerator({
  onPrayerGenerated,
}: AIPrayerGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrayer, setGeneratedPrayer] =
    useState<GeneratedPrayer | null>(null);
  const [formData, setFormData] = useState({
    intention: "",
    prayerType: "general",
    spiritualNeeds: [] as string[],
    saintDevotion: "",
    lifeCircumstance: "",
  });
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const prayerTypes = [
    { value: "general", label: "General Prayer" },
    { value: "morning", label: "Morning Prayer" },
    { value: "evening", label: "Evening Prayer" },
    { value: "intercession", label: "Intercessory Prayer" },
    { value: "thanksgiving", label: "Thanksgiving Prayer" },
    { value: "novena", label: "Novena Prayer" },
    { value: "marian", label: "Marian Prayer" },
    { value: "healing", label: "Healing Prayer" },
    { value: "guidance", label: "Prayer for Guidance" },
  ];

  const spiritualNeedsOptions = [
    "Peace and Calm",
    "Strength and Courage",
    "Forgiveness",
    "Healing",
    "Guidance",
    "Gratitude",
    "Protection",
    "Faith Growth",
    "Family Harmony",
    "Vocational Discernment",
  ];

  const popularSaints = [
    "St. Francis of Assisi",
    "St. Teresa of Avila",
    "St. Thérèse of Lisieux",
    "St. Joseph",
    "St. Anthony of Padua",
    "St. Padre Pio",
    "St. Joan of Arc",
    "St. Thomas Aquinas",
    "St. Benedict",
    "St. Clare of Assisi",
  ];

  const handleSpiritualNeedToggle = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      spiritualNeeds: prev.spiritualNeeds.includes(need)
        ? prev.spiritualNeeds.filter((n) => n !== need)
        : [...prev.spiritualNeeds, need],
    }));
  };

  const handleGeneratePrayer = async () => {
    if (!formData.intention.trim()) {
      setError("Please enter your prayer intention");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate-prayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate prayer");
      }

      const prayerData = await response.json();
      setGeneratedPrayer(prayerData);

      if (onPrayerGenerated) {
        onPrayerGenerated(prayerData);
      }
    } catch (error) {
      console.error("Error generating prayer:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while generating your prayer",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePrayer = async () => {
    if (!generatedPrayer) return;

    try {
      // Save to user's personal prayer collection
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // First create a prayer entry, then add to history
      const { data: prayerData, error: prayerError } = await supabase
        .from("prayers")
        .insert({
          title: `AI Generated Prayer - ${generatedPrayer.intention}`,
          content: generatedPrayer.prayer,
          category: generatedPrayer.prayerType,
          tradition: "catholic"
        })
        .select()
        .single();

      if (prayerError) throw prayerError;

      const { error } = await supabase.from("user_prayer_history").insert({
        user_id: user.id,
        prayer_id: prayerData.id,
        duration: null,
      });

      if (error) throw error;

      alert("Prayer saved to your personal collection!");
    } catch (error) {
      console.error("Error saving prayer:", error);
      alert("Failed to save prayer. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      intention: "",
      prayerType: "general",
      spiritualNeeds: [],
      saintDevotion: "",
      lifeCircumstance: "",
    });
    setGeneratedPrayer(null);
    setError(null);
  };

  if (!isOpen) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              AI Prayer Generator
            </h3>
            <p className="text-gray-600 text-sm">
              Generate personalized Catholic prayers with AI guidance
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Generate Prayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          AI Prayer Generator
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {!generatedPrayer ? (
        <div className="space-y-6">
          {/* Prayer Intention */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prayer Intention *
            </label>
            <textarea
              value={formData.intention}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, intention: e.target.value }))
              }
              placeholder="What would you like to pray for? (e.g., healing for a family member, guidance in making a decision, gratitude for blessings)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </div>

          {/* Prayer Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prayer Type
            </label>
            <select
              value={formData.prayerType}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, prayerType: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {prayerTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Spiritual Needs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spiritual Needs (select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {spiritualNeedsOptions.map((need) => (
                <label key={need} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.spiritualNeeds.includes(need)}
                    onChange={() => handleSpiritualNeedToggle(need)}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{need}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Saint Devotion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Saint Devotion (optional)
            </label>
            <select
              value={formData.saintDevotion}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  saintDevotion: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Choose a saint...</option>
              {popularSaints.map((saint) => (
                <option key={saint} value={saint}>
                  {saint}
                </option>
              ))}
            </select>
          </div>

          {/* Life Circumstance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Life Situation (optional)
            </label>
            <input
              type="text"
              value={formData.lifeCircumstance}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lifeCircumstance: e.target.value,
                }))
              }
              placeholder="e.g., new parent, job transition, illness, celebration"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Generate Button */}
          <div className="flex space-x-3">
            <button
              onClick={handleGeneratePrayer}
              disabled={isGenerating || !formData.intention.trim()}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Prayer...</span>
                </div>
              ) : (
                "Generate Prayer"
              )}
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Generated Prayer Display */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Your Generated Prayer
              </h4>
              <div className="text-sm text-gray-600">
                {generatedPrayer.liturgicalSeason} •{" "}
                {generatedPrayer.prayerType}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Intention:
                </p>
                <p className="text-gray-800 italic">
                  {generatedPrayer.intention}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Prayer:
                </p>
                <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {generatedPrayer.prayer}
                  </p>
                </div>
              </div>

              {generatedPrayer.saintDevotion && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Saint Intercession:
                  </p>
                  <p className="text-gray-600 text-sm">
                    {generatedPrayer.saintDevotion}
                  </p>
                </div>
              )}

              {generatedPrayer.scriptureReferences &&
                generatedPrayer.scriptureReferences.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Scripture References:
                    </p>
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                      {generatedPrayer.scriptureReferences.map(
                        (scripture, index) => (
                          <p
                            key={`scripture-${index}-${scripture.slice(0, 20).replace(/\s+/g, '-')}`}
                            className="text-blue-700 text-sm mb-1 last:mb-0"
                          >
                            {scripture}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleSavePrayer}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Save to My Prayers
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Generate Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
