using JetBrains.Annotations;


namespace FeedbackService.Models {

    [UsedImplicitly(ImplicitUseKindFlags.Assign, ImplicitUseTargetFlags.WithMembers)]
    public class Feedback {

        public int Id { get; set; }

        public string Message { get; set; }

    }

}