package com.dahse.review.ai.service;

import com.dahse.review.ai.dto.Rating;
import com.dahse.review.ai.dto.RatingDimension;
import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;
import com.theokanning.openai.completion.CompletionChoice;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class OpenAiGptService {

    @Value("${open-ai.api.key}")
    private String openAiApiKey;

    public List<RatingDimension> generateRatingDimensions(String topic) {

        String prompt = "An assessment should be given on the following topic: " + topic + "\n" +
                "\n" +
                "What would be 5 assessment dimensions covering the topic.\n" +
                "Please provide a json object where the key is the dimension name and the value a short description.\n" +
                "\n" +
                "Assessment dimensions json object:";

        Optional<CompletionChoice> choice = getCompletionChoice(prompt);

        ArrayList<RatingDimension> list = new ArrayList<>();

        if (choice.isEmpty()) {
            return list;
        }

        try {
            JSONObject jsonObject = new JSONObject(choice.get().getText().trim());

            for (Iterator it = jsonObject.keys(); it.hasNext(); ) {
                String key = (String) it.next();
                String value = (String) jsonObject.get(key);

                list.add(new RatingDimension(key, value));
            }

        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

        return list;
    }

    public String writeReview(String topic, List<Rating> ratings) {
        StringBuilder prompt = new StringBuilder("A rating text for a ");

        prompt.append(topic);
        prompt.append(" is based on 5 rating dimensions:\n\n");

        for (Rating rating : ratings) {
            prompt.append(rating.dimension().name())
                  .append(" was rated ")
                  .append(rating.rating())
                  .append(" out of 5 stars\n");
        }

        prompt.append("\nRating text:");

        Optional<CompletionChoice> choice = getCompletionChoice(prompt.toString(), 2048);

        if (choice.isEmpty()) {
            return "";
        }

        return choice.get().getText();
    }

    @NotNull
    private Optional<CompletionChoice> getCompletionChoice(String prompt) {
        return getCompletionChoice(prompt, 500);
    }

    @NotNull
    private Optional<CompletionChoice> getCompletionChoice(String prompt, Integer maxTokens) {
        OpenAiService service = new OpenAiService(openAiApiKey);

        CompletionRequest completionRequest = CompletionRequest.builder()
                .prompt(prompt)
                .model("text-davinci-003")
                .maxTokens(maxTokens)
                .temperature(0d)
                .build();

        return service.createCompletion(completionRequest)
                .getChoices()
                .stream()
                .findFirst();
    }
}
