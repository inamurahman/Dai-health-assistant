actor {
    public query func hello(message: Text) : async Text {
        return "Hello, " # message # "!";
    }
};
  