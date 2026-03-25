import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  type Story = {
    title : Text;
    category : Text;
    description : Text;
    durationSeconds : Nat;
    author : Text;
    audioUrl : Text;
  };

  module Story {
    public func compare(story1 : Story, story2 : Story) : Order.Order {
      Text.compare(story1.title, story2.title);
    };
  };

  let initialStories : [(Text, Story)] = [
    (
      "The Universe Boss",
      {
        title = "The Universe Boss";
        category = "Cricket Career";
        description = "Journey of Chris Gayle becoming one of the most feared batsmen in T20 cricket.";
        durationSeconds = 300;
        author = "Chris Gayle Foundation";
        audioUrl = "audio_url_placeholder1";
      },
    ),
    (
      "Overcoming Setbacks",
      {
        title = "Overcoming Setbacks";
        category = "Comebacks";
        description = "How Gayle bounced back from injuries and form slumps to become a legend.";
        durationSeconds = 240;
        author = "Cricket Academy";
        audioUrl = "audio_url_placeholder2";
      },
    ),
    (
      "Business Ventures",
      {
        title = "Business Ventures";
        category = "Business & Brand";
        description = "Chris Gayle's expansion into entrepreneurship and brand building.";
        durationSeconds = 180;
        author = "Business School";
        audioUrl = "audio_url_placeholder3";
      },
    ),
    (
      "Fitness Discipline",
      {
        title = "Fitness Discipline";
        category = "Personal Growth";
        description = "Gayle's commitment to fitness and its impact on his career longevity.";
        durationSeconds = 210;
        author = "Fitness Coach";
        audioUrl = "audio_url_placeholder4";
      },
    ),
    (
      "Charity Work",
      {
        title = "Charity Work";
        category = "Life Lessons";
        description = "Chris Gayle's charitable initiatives to help underprivileged youth in Jamaica.";
        durationSeconds = 260;
        author = "Chris Gayle Foundation";
        audioUrl = "audio_url_placeholder5";
      },
    ),
    (
      "Mindset of a Champion",
      {
        title = "Mindset of a Champion";
        category = "Personal Growth";
        description = "Exploring the mental strength and confidence that made Gayle successful.";
        durationSeconds = 230;
        author = "Sports Psychologist";
        audioUrl = "audio_url_placeholder6";
      },
    ),
    (
      "Record Breaking Feats",
      {
        title = "Record Breaking Feats";
        category = "Cricket Career";
        description = "Highlights of Gayle's record-shattering performances in international cricket.";
        durationSeconds = 280;
        author = "Cricket Historian";
        audioUrl = "audio_url_placeholder7";
      },
    ),
    (
      "Never Give Up",
      {
        title = "Never Give Up";
        category = "Comebacks";
        description = "Inspirational stories of perseverance and resilience from Gayle's life.";
        durationSeconds = 190;
        author = "Motivational Speaker";
        audioUrl = "audio_url_placeholder8";
      },
    ),
  ];

  let stories = Map.fromIter<Text, Story>(initialStories.values());

  var motivationalQuote : Text = "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice, and most of all, love of what you are doing.";

  public query ({ caller }) func getAllStories() : async [Story] {
    stories.values().toArray().sort();
  };

  public query ({ caller }) func getStoriesByCategory(category : Text) : async [Story] {
    stories.values().toArray().filter(func(story) { story.category == category });
  };

  public query ({ caller }) func getFeaturedStory() : async Story {
    switch (stories.get("The Universe Boss")) {
      case (?story) { story };
      case (null) { Runtime.trap("Featured story not found") };
    };
  };

  public query ({ caller }) func getMotivationalQuote() : async Text {
    motivationalQuote;
  };

  public shared ({ caller }) func setMotivationalQuote(quote : Text) : async () {
    motivationalQuote := quote;
  };

  public query ({ caller }) func getAllCategories() : async [Text] {
    ["Cricket Career", "Personal Growth", "Business & Brand", "Comebacks", "Life Lessons"];
  };

  public query ({ caller }) func getStoryByTitle(title : Text) : async Story {
    switch (stories.get(title)) {
      case (?story) { story };
      case (null) { Runtime.trap("Story not found") };
    };
  };
};
