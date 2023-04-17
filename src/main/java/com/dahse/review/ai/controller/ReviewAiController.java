package com.dahse.review.ai.controller;

import com.dahse.review.ai.dto.Rating;
import com.dahse.review.ai.dto.RatingDimension;
import com.dahse.review.ai.dto.RatingText;
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

    @GetMapping(path = "/rating")
    public @ResponseBody RatingText getRatingText(
           @RequestParam String topic,
           @RequestParam String dim1,
           @RequestParam Integer rating1,
           @RequestParam String dim2,
           @RequestParam Integer rating2,
           @RequestParam String dim3,
           @RequestParam Integer rating3,
           @RequestParam String dim4,
           @RequestParam Integer rating4,
           @RequestParam String dim5,
           @RequestParam Integer rating5
    ) {

        List<Rating> list = new ArrayList<>() {{
           add(new Rating(new RatingDimension(dim1, ""), rating1));
           add(new Rating(new RatingDimension(dim2, ""), rating2));
           add(new Rating(new RatingDimension(dim3, ""), rating3));
           add(new Rating(new RatingDimension(dim4, ""), rating4));
           add(new Rating(new RatingDimension(dim5, ""), rating5));
        }};

        return new RatingText(openAiGptService.writeReview(topic, list));
    }
}
