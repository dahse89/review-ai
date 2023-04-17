package com.dahse.review.ai.controller;

import com.dahse.review.ai.dto.RatingDimension;
import com.dahse.review.ai.service.OpenAiGptService;
import com.theokanning.openai.completion.CompletionChoice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // Allow angular dev server todo pdahse remove
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
