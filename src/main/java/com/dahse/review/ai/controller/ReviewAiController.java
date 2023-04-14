package com.dahse.review.ai.controller;

import com.dahse.review.ai.dto.RatingDimension;
import com.dahse.review.ai.service.OpenAiGptService;
import com.theokanning.openai.completion.CompletionChoice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ReviewAiController {

    @Autowired
    private OpenAiGptService openAiGptService;

    @GetMapping(path = "/rating-dimensions")
    public @ResponseBody List<RatingDimension> getRatingDimensions(
           @RequestParam String topic,
           @RequestParam String lang
    ) {

        return openAiGptService.generateRatingDimensions(topic);
    }
}
